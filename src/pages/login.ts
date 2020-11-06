import {LocaleMessageObject} from 'vue-i18n';
import LoginComponent from './../components/pages/Login.vue';
import messages from './../messages/pages/login.json';
import Page from './page';
import {VueConstructor} from 'vue';

export default class Login extends Page {
  name: string = 'login';
  path: string = '/login';
  component: VueConstructor = LoginComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
