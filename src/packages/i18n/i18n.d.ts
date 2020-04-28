import PageInterface from './../../packages/page/page';
import VueI18n, {LocaleMessages} from 'vue-i18n';

export default interface i18n {
  getI18n(): VueI18n

  changeLocale(locale: string): void

  getMessages(): LocaleMessages

  mergeMessages(messages: LocaleMessages): void

  mergePages(pages: PageInterface[]): void
}
