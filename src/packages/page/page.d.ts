import {LocaleMessageObject} from 'vue-i18n';

export default interface Page {
  name: string;
  path: string;
  component: any;
  messages: LocaleMessageObject | null;
  meta: any | null;
}
