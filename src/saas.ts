import Vue from 'vue';
import VueRouter from 'vue-router';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import SaasComponent from '@/Saas.vue';

// interfaces
import RouterInterface from '@/packages/router/router';
import PageInterface from '@/packages/page/page';

// pages
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';

// scss
import './scss/app.scss';

export default class Saas {
  private readonly name: string;
  private readonly router: RouterInterface;
  private readonly master: any;

  private pages: { [key: string]: PageInterface } = {
    'home': new HomePage(),
    'login': new LoginPage(),
  };

  constructor(name: string, router: RouterInterface, master: any) {
    this.name = name;
    this.router = router;
    this.master = master;
  }

  private preload(): void {
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.use(VueRouter);
    Vue.component('master', this.master);
  }

  private getPages(): PageInterface[] {
    const pages: PageInterface[] = [];

    for (const key of Object.keys(this.pages)) {
      pages.push(this.pages[key]);
    }

    return pages;
  }

  public getName(): string {
    return this.name;
  }

  public setPage(key: string, page: PageInterface) {
    this.pages[key] = page;
  }

  public run(): Vue {
    this.preload();

    Vue.prototype.$saas = this;

    return new Vue({
      render: (h) => h(SaasComponent),
      router: this.router.getRouter(this.getPages()),
    }).$mount('#app');
  }
}
