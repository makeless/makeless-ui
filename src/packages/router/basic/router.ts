import VueRouter, {RouteConfig} from 'vue-router';
import PageInterface from './../../../packages/page/page';

export default class Router {
  mode: any = 'history';
  base: string = __dirname;
  router: VueRouter | null = null;

  private computePages(pages: PageInterface[]): RouteConfig[] {
    let configs: RouteConfig[] = [];

    pages.forEach((page: PageInterface) => {
      configs.push({
        name: page.name,
        path: page.path,
        component: page.component,
        meta: page.meta,
      });
    });

    return configs;
  }

  public create(pages: PageInterface[]): void {
    this.router = new VueRouter({
      mode: this.mode,
      base: this.base,
      routes: this.computePages(pages),
    });
  }

  public redirect(to: string): void {
    if (this.getRouter().currentRoute.name === to) {
      return;
    }

    this.getRouter().push({name: to}).then();
  }

  public redirectToLogin(): void {
    this.redirect('login');
  }

  public redirectToDashboard(): void {
    this.redirect('dashboard')
  }

  public getRouter(): VueRouter {
    if (this.router === null) {
      throw new Error('router not created');
    }

    return this.router;
  }
}
