import {LocaleMessageObject} from 'vue-i18n';
import TokenComponent from './../../../components/pages/settings/token/Token.vue';
import messages from './../../../messages/pages/settings/token/token.json';

export default class Token {
  name: string = 'token';
  path: string = '/settings/token';
  component: any = TokenComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresToken: true,
  };
}
