// classes & interfaces
import Page from "./pages/page";
import Home from "./pages/home/home";
import Router from "./router/router";

// components
import SaasComponent from './Saas'

export default class Saas {
    private router: Router;
    private pages: Page[] = [
        new Home(),
    ];

    constructor(router: Router) {
        this.router = router;
    }

    public addPage(page: Page): void {
        this.pages.push(page);
    }

    public vue(): Object {
        return {
            el: '#app',
            components: {
                saas: SaasComponent,
            },
            router: this.router.createRouter(this.pages),
        };
    }
}
