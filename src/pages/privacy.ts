import {LocaleMessageObject} from 'vue-i18n';
import Page from './page';
import {VueConstructor} from 'vue';
import StaticPageUtil from './../utils/static-page';

export default class Privacy extends Page {
  name: string = 'privacy';
  path: string = '/privacy';
  component: VueConstructor = StaticPageUtil.new('privacy');
  messages: LocaleMessageObject | null = null;
  meta: any | null = {};
}
