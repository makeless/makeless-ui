import {LocaleMessageObject} from 'vue-i18n';
import HomeComponent from './../components/pages/Home.vue';

export default class Home {
  name: string = 'home';
  path: string = '/';
  component: any = HomeComponent;
  messages: LocaleMessageObject | null = null;
  meta: Object | null = null;
}
