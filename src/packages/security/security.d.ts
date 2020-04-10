import HttpInterface from '@/packages/http/http';
import RouterInterface from '@/packages/router/router';
import ResponseInterface from '@/packages/http/response';
import User from '@/models/user';
import Account from '@/models/account';

export default interface Security {
  http: HttpInterface;
  router: RouterInterface;

  setup(): void

  getUser(): User | null;

  getAccount(): Account | null

  isAuth(): boolean

  login(response: ResponseInterface): void

  logout(redirect: boolean): void
}
