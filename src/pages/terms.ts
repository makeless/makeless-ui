import {LocaleMessageObject} from 'vue-i18n';
import StaticComponent from './../components/pages/Static.vue';
import Page from './page';

export default class Terms extends Page {
  name: string = 'terms';
  path: string = '/terms';
  component: any = StaticComponent;
  messages: LocaleMessageObject | null = null;
  meta: any | null = {};
}
