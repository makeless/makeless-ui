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

  public redirectToLogin(): void {
    if (this.getRouter().currentRoute.name === 'login') {
      return;
    }

    this.getRouter().push({name: 'login'}).then();
  }

  public redirectToDashboard(): void {
    if (this.getRouter().currentRoute.name === 'dashboard') {
      return;
    }

    this.getRouter().push({name: 'dashboard'}).then();
  }

  public getRouter(): VueRouter {
    if (this.router === null) {
      throw new Error('router not created');
    }

    return this.router;
  }
}
