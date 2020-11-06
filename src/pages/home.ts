import {LocaleMessageObject} from 'vue-i18n';
import HomeComponent from './../components/pages/Home.vue';
import Page from './page';
import {VueConstructor} from 'vue';

export default class Home extends Page {
  name: string = 'home';
  path: string = '/';
  component: VueConstructor = HomeComponent;
  messages: LocaleMessageObject | null = null;
  meta: any | null = null;
}
