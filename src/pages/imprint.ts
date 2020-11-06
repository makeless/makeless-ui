import {LocaleMessageObject} from 'vue-i18n';
import Page from './page';
import {VueConstructor} from 'vue';
import StaticPageUtil from './../utils/static-page';

export default class Imprint extends Page {
  name: string = 'imprint';
  path: string = '/imprint';
  component: VueConstructor = StaticPageUtil.new('imprint');
  messages: LocaleMessageObject | null = null;
  meta: any | null = {};
}
