import HttpInterface from './../../packages/http/http';
import RouterInterface from './../../packages/router/router';
import ResponseInterface from './../../packages/http/response';
import User from './../../models/user';
import Team from './../../models/team';

export default interface Security {
  http: HttpInterface;
  router: RouterInterface;

  /**
   * Required method to init go-saas
   * Loads user, sets up auth middleware, starts silent auth refresh and sets up logout handler
   */
  setup(): void

  /**
   * Returns user full name or current team name if exists
   * @returns string | null
   */
  getDisplayName(): string | null

  /**
   * Returns user if loaded
   * @returns User | null
   */
  getUser(): User | null;

  /**
   * Returns current team if exists
   * @returns Team | null
   */
  getTeam(): Team | null

  /**
   * Returns login status
   * @returns boolean
   */
  isAuth(): boolean

  /**
   * Switchs to user and redirects to dashboard if successful
   */
  switchToUser(): void

  /**
   * Switchs to team and redirects to dashboard if successful
   * @param id - team id
   */
  switchToTeam(id: number): void

  /**
   * Handles login and redirects to dashboard if successful
   * @param response - response interface from http package
   */
  login(response: ResponseInterface): void

  /**
   * Handles logout and redirects to login if set
   * @param redirect - defines redirection
   */
  logout(redirect: boolean): void
}
