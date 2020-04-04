import VueRouter from 'vue-router'
import Page from "../../pages/page";

export default class Router {
    mode: string = 'history';
    base: string = __dirname;

    private createRoutes(pages: Page[]): any {
        const routes = [];

        pages.forEach((page: Page) => {
            routes.push({
                path: page.path,
                component: page.component,
            })
        });
    }

    public createRouter(pages: Page[]): VueRouter {
        return new VueRouter({
            mode: 'history',
            base: __dirname,
            routes: this.createRoutes(pages),
        })
    }
}
