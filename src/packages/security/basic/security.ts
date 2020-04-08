import dayjs from 'dayjs';

import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';

export default class Security {
  readonly localStorageKey = 'jwt-expire';
  readonly router: RouterInterface;
  readonly http: HttpInterface;

  constructor(router: RouterInterface, http: HttpInterface) {
    this.router = router;
    this.http = http;
  }

  public setupAuthMiddleware(): void {
    this.router.getRouter().beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth) && this.isExpired()) {
        next({
          path: '/login',
        });
        return;
      }

      if (to.matched.some(record => record.meta.guest) && !this.isExpired()) {
        next({
          path: '/dashboard',
        });
        return;
      }

      next();
    });
  }

  public isExpired(): boolean {
    const expire = this.getExpire();

    if (expire === null) {
      return false;
    }

    return expire > new Date().getTime();
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
}
