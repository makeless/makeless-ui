import {LocaleMessageObject} from 'vue-i18n';
import Page from './page';
import {VueConstructor} from 'vue';
import StaticPageUtil from './../utils/static-page';

export default class Terms extends Page {
  name: string = 'terms';
  path: string = '/terms';
  component: VueConstructor = StaticPageUtil.new('terms');
  messages: LocaleMessageObject | null = null;
  meta: any | null = {};
}
