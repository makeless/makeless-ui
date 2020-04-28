import {LocaleMessageObject} from 'vue-i18n';
import LoginComponent from './../components/pages/Login.vue';
import messages from './../messages/pages/login.json';

export default class Login {
  name: string = 'login';
  path: string = '/login';
  component: any = LoginComponent;
  messages: LocaleMessageObject | null = messages;
  meta: Object | null = {
    guest: true,
  };
}
