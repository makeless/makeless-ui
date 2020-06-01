import {LocaleMessageObject} from 'vue-i18n';
import DashboardComponent from './../components/pages/Dashboard.vue';

export default class Dashboard {
  name: string = 'dashboard';
  path: string = '/dashboard';
  component: any = DashboardComponent;
  messages: LocaleMessageObject | null = null;
  meta: any | null = {
    requiresAuth: true,
  };
}
