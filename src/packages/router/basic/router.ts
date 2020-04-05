import VueRouter, {RouteConfig} from 'vue-router';
import PageInterface from '@/packages/page/page';

export default class Router {
  mode: any = 'history';
  base: string = __dirname;

  private computePages(pages: PageInterface[]): RouteConfig[] {
    let configs: RouteConfig[] = [];

    pages.forEach((page: PageInterface) => {
      configs.push({
        path: page.path,
        component: page.component,
        meta: page.meta,
      });
    });

    return configs;
  }

  getRouter(pages: PageInterface[]): VueRouter {
    return new VueRouter({
      mode: this.mode,
      base: this.base,
      routes: this.computePages(pages),
    });
  }
}
