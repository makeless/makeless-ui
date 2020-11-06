import {LocaleMessageObject} from 'vue-i18n';
import EmailVerificationComponent from './../components/pages/EmailVerification.vue';
import Page from './page';
import messages from './../messages/pages/email-verification.json';
import {VueConstructor} from 'vue';

export default class EmailVerification extends Page {
  name: string = 'email-verification';
  path: string = '/email-verification';
  component: VueConstructor = EmailVerificationComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {};
}
