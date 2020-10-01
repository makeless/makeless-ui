import {LocaleMessageObject} from 'vue-i18n';
import EmailUnverifiedComponent from './../components/pages/EmailUnverified.vue';
import Page from './page';
import messages from './../messages/pages/email-unverified.json';

export default class EmailUnverified extends Page {
  name: string = 'email-unverified';
  path: string = '/email-unverified';
  component: any = EmailUnverifiedComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
  };
}
