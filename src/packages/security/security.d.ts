import HttpInterface from './../../packages/http/http';
import RouterInterface from './../../packages/router/router';
import ResponseInterface from './../../packages/http/response';
import User from './../../models/user';
import Team from './../../models/team';

export default interface Security {
  http: HttpInterface;
  router: RouterInterface;

  setup(): void

  getDisplayName(): string | null

  getUser(): User | null;

  getTeam(): Team | null

  isAuth(): boolean

  switchToUser(): void

  switchToTeam(id: number): void

  login(response: ResponseInterface): void

  logout(redirect: boolean): void
}
