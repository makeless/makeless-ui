import {LocaleMessageObject} from 'vue-i18n';
import ProfileComponent from './../../components/pages/settings/Password.vue';
import messages from './../../messages/pages/settings/password.json';

export default class Password {
  name: string = 'password';
  path: string = '/settings/password';
  component: any = ProfileComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
  };
}
