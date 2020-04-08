import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';

export default class Security {
  expire: Date | null;
  readonly router: RouterInterface;
  readonly http: HttpInterface;

  constructor(router: RouterInterface, http: HttpInterface) {
    this.expire = null;
    this.router = router;
    this.http = http;
  }

  public setExpire(expire: Date | null): void {
    this.expire = expire;
  }

  public login(response: ResponseInterface): void {
    this.setExpire(new Date(response.getData().expire));
    this.router.getRouter().push('/dashboard').then(null);
  }
}
