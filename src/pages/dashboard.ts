import {LocaleMessageObject} from 'vue-i18n';
import DashboardComponent from './../components/pages/Dashboard.vue';
import Page from "./page";

export default class Dashboard extends Page {
  name: string = 'dashboard';
  path: string = '/dashboard';
  component: any = DashboardComponent;
  messages: LocaleMessageObject | null = null;
  meta: any | null = {
    requiresAuth: true,
  };
}
