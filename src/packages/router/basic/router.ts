import VueRouter, {Location, RouteConfig} from 'vue-router';
import PageInterface from './../../../packages/page/page';

const {NavigationFailureType, isNavigationFailure} = VueRouter;

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

  private push(location: Location): void {
    this.getVueRouter().push(location).catch((err: Error) => {
      if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
        throw err;
      }
    });
  }

  public create(pages: PageInterface[]): void {
    this.router = new VueRouter({
      mode: this.mode,
      base: this.base,
      routes: this.computePages(pages),
    });
  }

  public redirectToName(name: string, data?: Location) {
    const location: Location = Object.assign(data || {}, {name: name, path: null});
    this.push(location);
  }

  public redirectToLogin(data?: Location): void {
    this.redirectToName('login', data);
  }

  public redirectToDashboard(data?: Location): void {
    this.redirectToName('dashboard', data);
  }

  public redirectToPath(path: string, data?: Location): void {
    const location: Location = Object.assign(data || {}, {path: path, name: null});
    this.push(location);
  }

  public getVueRouter(): VueRouter {
    if (this.router === null) {
      throw new Error('vue router not created');
    }

    return this.router;
  }
}
