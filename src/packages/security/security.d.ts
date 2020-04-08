import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';

export default interface Security {
  http: HttpInterface;
  router: RouterInterface;

  setupAuthMiddleware(): void

  isExpired(): boolean

  getExpire(): number | null

  setExpire(expire: Date | null): void

  removeExpire(): void

  login(response: ResponseInterface): void
}
