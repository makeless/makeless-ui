import {LocaleMessageObject} from 'vue-i18n';
import ProfileComponent from './../../components/pages/settings/Password.vue';
import messages from './../../messages/pages/settings/password.json';
import Page from '../page';
import {VueConstructor} from 'vue';

export default class Password extends Page {
  name: string = 'password';
  path: string = '/settings/password';
  component: VueConstructor = ProfileComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresUserAuth: true,
  };
}
