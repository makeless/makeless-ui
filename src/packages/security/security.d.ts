import HttpInterface from './../../packages/http/http';
import RouterInterface from './../../packages/router/router';
import ResponseInterface from './../../packages/http/response';
import User from './../../models/user';
import Team from './../../models/team';
import EventInterface from '../event/event';
import StorageInterface from '../storage/storage';
import PageInterface from "../page/page";

export default interface Security {
  router: RouterInterface;
  http: HttpInterface;
  event: EventInterface;
  storage: StorageInterface;

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
   * Returns if user is current team owner
   * @returns boolean
   */
  isTeamOwner(): boolean

  /**
   * Adds team to user
   * @param team - team instance
   */
  addTeam(team: Team): void

  /**
   * Deletes team from user
   * @param team - team instance
   */
  deleteTeam(team: Team): void

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
   * Returns if an page is accessable by current state (f.e. login)
   * @param page - page interface
   */
  isPageAccessible(page: PageInterface): boolean

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
