import {LocaleMessageObject} from 'vue-i18n';
import PasswordRequestComponent from './../components/pages/PasswordRequest.vue';
import messages from './../messages/pages/password-request.json';
import Page from "./page";

export default class PasswordRequest extends Page {
  name: string = 'password-request';
  path: string = '/password-request';
  component: any = PasswordRequestComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
