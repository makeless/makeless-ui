import PageInterface from './../../packages/page/page';
import VueI18n, {Locale, LocaleMessages} from 'vue-i18n';

export default interface i18n {
  /**
   * Returns current VueI18n instance
   * @returns VueI18n
   */
  getI18n(): VueI18n

  /**
   * Returns current locale
   */
  getLocale(): string

  /**
   * Switchs platform locale
   * @param locale - VueI18n locale
   */
  changeLocale(locale: Locale): void

  /**
   * Returns all messages
   * @returns LocaleMessages
   */
  getMessages(): LocaleMessages

  /**
   * Merge and overwrite messages
   * @param messages - messages
   */
  mergeMessages(messages: LocaleMessages): void

  /**
   * Merge page translations - used internally
   * @param pages - pages
   */
  mergePages(pages: PageInterface[]): void
}
