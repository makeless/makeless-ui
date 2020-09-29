import {LocaleMessageObject} from 'vue-i18n';
import RegistrationComponent from './../components/pages/Registration.vue';
import messages from './../messages/pages/registration.json';
import Page from "./page";

export default class Registration extends Page {
  name: string = 'registration';
  path: string = '/registration';
  component: any = RegistrationComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
