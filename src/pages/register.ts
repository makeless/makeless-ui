import {LocaleMessageObject} from 'vue-i18n';
import RegisterComponent from './../components/pages/Register.vue';
import messages from './../messages/pages/register.json';
import Page from "./page";

export default class Register extends Page {
  name: string = 'register';
  path: string = '/register';
  component: any = RegisterComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
