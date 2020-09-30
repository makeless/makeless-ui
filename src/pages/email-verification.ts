import {LocaleMessageObject} from 'vue-i18n';
import EmailVerificationComponent from './../components/pages/EmailVerification.vue';
import Page from './page';
import messages from './../messages/pages/email-verification.json';

export default class Dashboard extends Page {
  name: string = 'email-verification';
  path: string = '/email-verification';
  component: any = EmailVerificationComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
