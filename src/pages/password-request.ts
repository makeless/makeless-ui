import {LocaleMessageObject} from 'vue-i18n';
import LoginComponent from './../components/pages/PasswordRequest.vue';
import messages from './../messages/pages/password-request.json';
import Page from "./page";

export default class PasswordRequest extends Page {
  name: string = 'password-request';
  path: string = '/password-request';
  component: any = LoginComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
