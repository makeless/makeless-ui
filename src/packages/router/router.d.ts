import VueRouter from 'vue-router';
import PageInterface from './../../packages/page/page';

export default interface Router {
  mode: any;
  base: string;
  router: VueRouter | null;

  /**
   * Creates VueRouter
   * @param pages - pages
   */
  create(pages: PageInterface[]): void;

  /**
   * Redirect to route name
   */
  redirectToName(name: string): void

  /**
   * Shorthand for login redirection
   */
  redirectToLogin(): void

  /**
   * Shorthand for dashboard redirection
   */
  redirectToDashboard(): void

  /**
   * Redirect to path
   */
  redirectToPath(path: string): void

  /**
   * Returns VueRouter
   * @returns VueRouter
   */
  getVueRouter(): VueRouter
}
