import {LocaleMessageObject} from 'vue-i18n';
import DashboardComponent from './../components/pages/Dashboard.vue';
import Page from './page';
import messages from './../messages/pages/dashboard.json';
import {VueConstructor} from 'vue';

export default class Dashboard extends Page {
  name: string = 'dashboard';
  path: string = '/dashboard';
  component: VueConstructor = DashboardComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
  };
}
