import {LocaleMessageObject} from 'vue-i18n';
import PageNotFoundComponent from './../components/pages/PageNotFound.vue';
import messages from './../messages/pages/page-not-found.json';

export default class PageNotFound {
  name: string = 'page-not-found';
  path: string = '*';
  component: any = PageNotFoundComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = null;
}
