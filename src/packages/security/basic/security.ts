import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';
import Response from '@/packages/http/axios/response';
import User from '@/models/user';
import Account from '@/models/account';

export default class Security {
  user: User | null = null;
  account: Account | null = null;

  readonly localStorageKey: string = 'jwt-expire';
  readonly router: RouterInterface;
  readonly http: HttpInterface;

  constructor(router: RouterInterface, http: HttpInterface) {
    this.router = router;
    this.http = http;
  }

  private removeUser(): void {
    this.user = null;
  }

  private removeAccount(): void {
    this.account = null;
  }

  private getExpire(): number | null {
    const expire = localStorage.getItem(this.localStorageKey);

    if (expire === null || expire === '') {
      return null;
    }

    return parseInt(expire);
  }

  private setExpire(expire: Date): void {
    localStorage.setItem(this.localStorageKey, expire.getTime().toString());
  }

  private removeExpire(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  private initAccount(): Account | null {
    if (this.user === null || this.user.id === null) {
      return null;
    }

    return new Account(this.user.id, this.user.getFullName(), false);
  }

  private loadUser(): void {
    if (!this.isAuth()) {
      return;
    }

    this.http.get('/api/auth/user').then((data) => {
      this.user = new User().create(new Response(data).getData().data);
      this.account = this.initAccount();
      window.dispatchEvent(new Event('user-loaded'));
    }).catch((_) => {
      this.logout(true);
    });
  }

  private authMiddleware(): void {
    this.router.getRouter().beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth) && !this.isAuth()) {
        next({path: '/login'});
        return;
      }

      if (to.matched.some(record => record.meta.guest) && this.isAuth()) {
        next({path: '/dashboard'});
        return;
      }

      next();
    });
  }

  private refreshAuth(): void {
    if (!this.isAuth()) {
      return;
    }

    setInterval(() => {
      this.http.get('/api/auth/refresh-token').then((data) => {
        const response = new Response(data);
        this.setExpire(new Date(response.getData().expire));
      }).catch(() => {
        this.removeExpire();
        this.router.getRouter().push('login').then(null);
      });
    }, 10 * 60 * 1000);
  }

  private logoutHandler(): void {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key !== this.localStorageKey) {
        return;
      }

      if (!this.router.getRouter().currentRoute.meta.requiresAuth) {
        return;
      }

      this.router.getRouter().push('login').then(null);
    });
  }

  public setup(): void {
    this.loadUser();
    this.authMiddleware();
    this.refreshAuth();
    this.logoutHandler();
  }

  public getUser(): User | null {
    return this.user;
  }

  public getAccount(): Account | null {
    return this.account;
  }

  public isAuth(): boolean {
    const expire = this.getExpire();

    if (expire === null) {
      return false;
    }

    return expire > new Date().getTime();
  }

  public login(response: ResponseInterface): void {
    this.setExpire(new Date(response.getData().expire));
    this.loadUser();
    this.router.getRouter().push('dashboard').then(null);
  }

  public logout(redirect: boolean): void {
    this.removeExpire();
    this.removeUser();
    this.removeAccount();

    if (redirect) {
      this.router.getRouter().push({name: 'login'}).then(null);
    }
  }
}
