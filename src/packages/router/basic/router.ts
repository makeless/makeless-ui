import VueRouter, {Location, RouteConfig} from 'vue-router';
import RouterInterface from '../router';
import PageInterface from '../../page/page';

const {NavigationFailureType, isNavigationFailure} = VueRouter;

export default class Router implements RouterInterface {
  mode: any = 'history';
  router: VueRouter | null = null;

  private computePages(pages: PageInterface[]): RouteConfig[] {
    const configs: RouteConfig[] = [];

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
