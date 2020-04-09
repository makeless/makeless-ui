import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';
import Response from '@/packages/http/axios/response';

export default class Security {
  readonly localStorageKey: string = 'jwt-expire';
  readonly router: RouterInterface;
  readonly http: HttpInterface;

  constructor(router: RouterInterface, http: HttpInterface) {
    this.router = router;
    this.http = http;
  }

  private authMiddleware(): void {
    this.router.getRouter().beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth) && !this.isAuth()) {
        next({
          path: '/login',
        });
        return;
      }

      if (to.matched.some(record => record.meta.guest) && this.isAuth()) {
        next({
          path: '/dashboard',
        });
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
        this.router.getRouter().push('/login').then(null);
      });
    }, 10 * 60 * 1000);
  }

  public isAuth(): boolean {
    const expire = this.getExpire();

    if (expire === null) {
      return false;
    }

    return expire > new Date().getTime();
  }

  public setup(): void {
    this.authMiddleware();
    this.refreshAuth();
  }

  public getExpire(): number | null {
    const expire = localStorage.getItem(this.localStorageKey);

    if (expire === null || expire === '') {
      return null;
    }

    return parseInt(expire);
  }

  public setExpire(expire: Date): void {
    localStorage.setItem(this.localStorageKey, expire.getTime().toString());
  }

  public removeExpire(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  public login(response: ResponseInterface): void {
    this.setExpire(new Date(response.getData().expire));
    this.router.getRouter().push('/dashboard').then(null);
  }

  public logout(): void {
    this.removeExpire();
    this.router.getRouter().push('/login').then(null);
  }
}
