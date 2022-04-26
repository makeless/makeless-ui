import VueRouter, {Location} from 'vue-router';
import PageInterface from '../page/page';

export default interface Router {
  mode: any;
  router: VueRouter | null;

  /**
   * Creates VueRouter
   * @param pages - pages
   */
  create(pages: PageInterface[]): void;

  /**
   * Redirect to route name
   */
  redirectToName(name: string, data?: Location): void;

  /**
   * Shorthand for login redirection
   */
  redirectToLogin(data?: Location): void;

  /**
   * Shorthand for dashboard redirection
   */
  redirectToDashboard(data?: Location): void;

  /**
   * Redirect to route path
   */
  redirectToPath(path: string, data?: Location): void;

  /**
   * Returns VueRouter
   * @returns VueRouter
   */
  getVueRouter(): VueRouter;
}
