import Vue, {VueConstructor} from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

// main
import MakelessComponent from './Makeless.vue';

// interfaces
import ConfigInterface from './packages/config/config';
import RouterInterface from './packages/router/router';
import PageInterface from './packages/page/page';
import HttpInterface from './packages/http/http';
import SecurityInterface from './packages/security/security';
import I18nInterface from './packages/i18n/i18n';
import EventInterface from './packages/event/event';

import Config from './packages/config/basic/config';
import Router from './packages/router/basic/router';
import Form from './packages/form/basic/form';
import State from './packages/state/basic/state';
import Validator from './packages/validator/basic/validator';
import Axios from './packages/http/axios/axios';
import Security from './packages/security/basic/security';
import I18n from './packages/i18n/basic/i18n';
import LocalStorage from './packages/storage/local-storage/local-storage';
import Event from './packages/event/basic/event';

// pages
import Page from './pages/page';
import TermsPage from './pages/terms';
import ImprintPage from './pages/imprint';
import PrivacyPage from './pages/privacy';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import InvitationPage from './pages/invitation';
import PasswordRequestPage from './pages/password-request';
import PasswordResetPage from './pages/password-reset';
import RegisterPage from './pages/register';
import EmailUnverifiedPage from './pages/email-unverified';
import EmailVerificationPage from './pages/email-verification';
import DashboardPage from './pages/dashboard';
import ProfilePage from './pages/settings/profile/profile';
import ProfileTeamPage from './pages/settings/profile/profile-team';
import TeamPage from './pages/settings/team';
import TeamUserTeamPage from './pages/settings/team-user/team-user-team';
import PasswordPage from './pages/settings/password';
import TeamInvitationPage from './pages/settings/team-invitation/team-invitation';
import TeamInvitationTeamPage from './pages/settings/team-invitation/team-invitation-team';
import TokenPage from './pages/settings/token/token';
import TokenTeamPage from './pages/settings/token/token-team';
import PageNotFoundPage from './pages/page-not-found';

// components
import MasterComponent from './components/layouts/Master.vue';
import NavigationComponent from './components/navigations/Navigation.vue';
import SettingNavigationComponent from './components/navigations/SettingNavigation.vue';
import UserDropdownComponent from './components/navigations/UserDropdown.vue';

// utils
import DomUtil from './utils/dom';
import ObjectUtil from './utils/object';
import StaticPageUtil from './utils/static-page';
import ValidatorUtil from './utils/validator';

// structs
import PasswordUpdate from './structs/password-update'

// plugins
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(VueI18n);

class Makeless {
  private readonly config: ConfigInterface;
  private readonly router: RouterInterface;
  private readonly http: HttpInterface;
  private readonly i18n: I18nInterface;
  private readonly event: EventInterface;
  private readonly security: SecurityInterface;

  constructor(
      config: ConfigInterface,
      router: RouterInterface,
      http: HttpInterface,
      i18n: I18nInterface,
      event: EventInterface,
      security: SecurityInterface,
  ) {
    this.config = config;
    this.router = router;
    this.http = http;
    this.i18n = i18n;
    this.event = event;
    this.security = security;
  }

  private pages: { [key: string]: PageInterface } = {
    'terms': new TermsPage(),
    'imprint': new ImprintPage(),
    'privacy': new PrivacyPage(),
    'home': new HomePage(),
    'login': new LoginPage(),
    'invitation': new InvitationPage(),
    'password-request': new PasswordRequestPage(),
    'password-reset': new PasswordResetPage(),
    'register': new RegisterPage(),
    'email-unverified': new EmailUnverifiedPage(),
    'email-verification': new EmailVerificationPage(),
    'dashboard': new DashboardPage(),
    'profile': new ProfilePage(),
    'password': new PasswordPage(),
    'team-invitation': new TeamInvitationPage(),
    'team-invitation-team': new TeamInvitationTeamPage(),
    'page-not-found': new PageNotFoundPage(),
    'team': new TeamPage(),
    'token': new TokenPage(),
    'team-user-team': new TeamUserTeamPage(),
    'profile-team': new ProfileTeamPage(),
    'token-team': new TokenTeamPage(),
  };

  private components: { [key: string]: VueConstructor } = {
    'master': MasterComponent,
    'navigation': NavigationComponent,
    'setting-navigation': SettingNavigationComponent,
    'user-dropdown': UserDropdownComponent,
  };

  private getPages(): PageInterface[] {
    const configuration = this.getConfig().getConfiguration();

    for (const key of Object.keys(this.pages)) {
      const page = this.pages[key];
      if (!this.getSecurity().isPageEnabled(page, configuration)) {
        delete this.pages[key];
      }
    }

    return Object.values(this.pages);
  }

  public getConfig(): ConfigInterface {
    return this.config;
  }

  public setPage(key: string, page: PageInterface | null): void {
    if (page === null && this.pages[key]) {
      delete this.pages[key];
      return;
    }

    this.pages[key] = page!;
  }

  public getPage(key: string): PageInterface | null {
    if (this.pages[key] === undefined) {
      return null;
    }

    return this.pages[key];
  }

  public setComponent(key: string, component: VueConstructor) {
    this.components[key] = component;
  }

  public getComponent(key: string): VueConstructor {
    return this.components[key];
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

  public getEvent(): EventInterface {
    return this.event;
  }

  public getSecurity(): SecurityInterface {
    return this.security;
  }

  public t(key: VueI18n.Path, values?: VueI18n.Values): VueI18n.TranslateResult {
    return this.getI18n().getI18n().t(key, values);
  }

  public async init(): Promise<Makeless> {
    // components
    for (const key in this.components) {
      Vue.component(key, this.components[key]);
    }

    // router
    this.getRouter().create(this.getPages());

    // setup i18n
    this.getI18n().mergePages(this.getPages());

    // setup security
    await this.getSecurity().setup();

    // prototypes
    Vue.prototype.$makeless = Vue.observable(this);

    return new Promise<Makeless>(resolve => resolve(this));
  }

  public run(): Vue {
    return new Vue({
      render: (h) => h(MakelessComponent),
      router: this.getRouter().getVueRouter(),
    }).$mount('#app');
  }
}

export {
  Makeless,

  Config,
  Router,
  Form,
  State,
  Validator,
  Axios,
  Security,
  I18n,
  LocalStorage,
  Event,

  Page,
  TermsPage,
  ImprintPage,
  PrivacyPage,
  HomePage,
  LoginPage,
  InvitationPage,
  PasswordRequestPage,
  PasswordResetPage,
  RegisterPage,
  EmailUnverifiedPage,
  EmailVerificationPage,
  DashboardPage,
  ProfilePage,
  ProfileTeamPage,
  TeamPage,
  TeamUserTeamPage,
  PasswordPage,
  TeamInvitationPage,
  TeamInvitationTeamPage,
  TokenPage,
  TokenTeamPage,
  PageNotFoundPage,

  DomUtil,
  ObjectUtil,
  StaticPageUtil,
  ValidatorUtil,

  PasswordUpdate
};
