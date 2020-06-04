import {LocaleMessageObject} from 'vue-i18n';
import PasswordResetComponent from './../components/pages/PasswordReset.vue';
import messages from './../messages/pages/password-reset.json';
import Page from "./page";

export default class PasswordReset extends Page {
  name: string = 'password-reset';
  path: string = '/password-reset';
  component: any = PasswordResetComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
