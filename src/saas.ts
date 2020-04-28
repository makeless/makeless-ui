import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

// main
import SaasComponent from './Saas.vue';

// interfaces
import RouterInterface from './packages/router/router';
import PageInterface from './packages/page/page';
import HttpInterface from './packages/http/http';
import SecurityInterface from './packages/security/security';
import I18nInterface from './packages/i18n/i18n';

// pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import ProfilePage from './pages/settings/profile/profile';
import ProfileTeamPage from './pages/settings/profile/profile-team';
import TeamsPage from './pages/settings/teams/teams';
import PageNotFoundPage from './pages/page-not-found';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(VueI18n);

export default class Saas {
  private readonly name: string;
  private readonly master: any;
  private readonly router: RouterInterface;
  private readonly http: HttpInterface;
  private readonly i18n: I18nInterface;
  private readonly security: SecurityInterface;

  constructor(
      name: string,
      master: any,
      router: RouterInterface,
      http: HttpInterface,
      i18n: I18nInterface,
      security: SecurityInterface,
  ) {
    this.name = name;
    this.master = master;
    this.router = router;
    this.http = http;
    this.i18n = i18n;
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

  public getPage(key: string): PageInterface {
    return this.pages[key];
  }

  public getRouter(): RouterInterface {
    return this.router;
  }

  public getHttp(): HttpInterface {
    return this.http;
  }

  public getI18n(): I18nInterface {
    return this.i18n;
  }

  public getSecurity(): SecurityInterface {
    return this.security;
  }

  public t(key: VueI18n.Path, values?: VueI18n.Values): VueI18n.TranslateResult {
    return this.getI18n().getI18n().t(key, values);
  }

  public init(): void {
    // components
    Vue.component('master', this.master);

    // router
    this.getRouter().create(this.getPages());

    // setup i18n
    this.getI18n().mergePages(this.getPages());

    // setup security
    this.getSecurity().setup();

    // prototypes
    Vue.prototype.$saas = Vue.observable(this);
  }

  public run(): Vue {
    return new Vue({
      render: (h) => h(SaasComponent),
      router: this.getRouter().getRouter(),
    }).$mount('#app');
  }
}
