import Vue from 'vue';
import VueRouter from 'vue-router';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import SaasComponent from '@/Saas.vue';

// interfaces
import RouterInterface from '@/packages/router/router';
import PageInterface from '@/packages/page/page';
import HttpInterface from '@/packages/http/http';
import SecurityInterface from '@/packages/security/security';

// pages
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';

// scss
import './scss/app.scss';

export default class Saas {
  private readonly name: string;
  private readonly master: any;
  private readonly router: RouterInterface;
  private readonly http: HttpInterface;
  private readonly security: SecurityInterface;

  constructor(
      name: string,
      master: any,
      router: RouterInterface,
      http: HttpInterface,
      security: SecurityInterface,
  ) {
    this.name = name;
    this.master = master;
    this.router = router;
    this.http = http;
    this.security = security;
  }

  private pages: { [key: string]: PageInterface } = {
    'home': new HomePage(),
    'login': new LoginPage(),
  };

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

  public getRouter(): RouterInterface {
    return this.router;
  }

  public getHttp(): HttpInterface {
    return this.http;
  }

  public getSecurity(): SecurityInterface {
    return this.security;
  }

  public run(): Vue {
    this.preload();

    // router
    this.getRouter().create(this.getPages());

    // prototypes
    Vue.prototype.$saas = this;

    return new Vue({
      render: (h) => h(SaasComponent),
      router: this.getRouter().getRouter(),
    }).$mount('#app');
  }
}
