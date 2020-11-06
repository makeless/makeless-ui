import {LocaleMessageObject} from 'vue-i18n';
import PageNotFoundComponent from './../components/pages/PageNotFound.vue';
import messages from './../messages/pages/page-not-found.json';
import Page from './page';
import {VueConstructor} from 'vue';

export default class PageNotFound extends Page {
  name: string = 'page-not-found';
  path: string = '*';
  component: VueConstructor = PageNotFoundComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = null;
}
