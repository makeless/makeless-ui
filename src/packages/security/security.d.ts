import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';

export default interface Security {
  expire: Date | null;
  http: HttpInterface;
  router: RouterInterface;

  setExpire(expire: Date | null): void

  login(response: ResponseInterface): void
}
