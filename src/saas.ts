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
import DashboardPage from '@/pages/dashboard';
import ProfilePage from '@/pages/settings/profile/profile';
import ProfileTeamPage from '@/pages/settings/profile/profile-team';
import TeamsPage from '@/pages/settings/teams/teams';
import PageNotFoundPage from '@/pages/page-not-found';

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
    'dashboard': new DashboardPage(),
    'profile': new ProfilePage(),
    'profile-team': new ProfileTeamPage(),
    'teams': new TeamsPage(),
    'page-not-found': new PageNotFoundPage(),
  };

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
    // plugins
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.use(VueRouter);

    // components
    Vue.component('master', this.master);

    // router
    this.getRouter().create(this.getPages());

    // setup security
    this.getSecurity().setup();

    // prototypes
    Vue.prototype.$saas = Vue.observable(this);

    return new Vue({
      render: (h) => h(SaasComponent),
      router: this.getRouter().getRouter(),
    }).$mount('#app');
  }
}
