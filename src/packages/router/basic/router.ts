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

  public redirectToName(name: string): void {
    if (this.getVueRouter().currentRoute.name === name) {
      return;
    }

    this.getVueRouter().push({name: name}).then();
  }

  public redirectToLogin(): void {
    this.redirectToName('login');
  }

  public redirectToDashboard(): void {
    this.redirectToName('dashboard');
  }

  public redirectToPath(path: string): void {
    if (this.getVueRouter().currentRoute.fullPath === path) {
      return;
    }

    this.getVueRouter().push({path: path}).then();
  }

  public getVueRouter(): VueRouter {
    if (this.router === null) {
      throw new Error('vue router not created');
    }

    return this.router;
  }
}
