import VueI18n, {Locale, LocaleMessages} from 'vue-i18n';
import PageInterface from './../../../packages/page/page';
import global from './../../../messages/global.json';

export default class i18n {
  private readonly vueI18n: VueI18n;

  constructor(locale: string) {
    this.vueI18n = new VueI18n({
      locale: locale,
      messages: global,
    });
  }

  public getI18n(): VueI18n {
    return this.vueI18n;
  }

  public changeLocale(locale: Locale): void {
    this.getI18n().locale = locale;
  }

  public getMessages(): LocaleMessages {
    return this.getI18n().messages;
  }

  public mergeMessages(messages: LocaleMessages): void {
    if (messages === null) {
      return;
    }

    for (const locale of Object.keys(messages)) {
      this.getI18n().mergeLocaleMessage(locale, messages[locale]);
    }
  }

  public mergePages(pages: PageInterface[]): void {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const messages = page.messages;

      if (messages === null) {
        continue;
      }

      const obj: LocaleMessages = {'pages': {}};
      for (const locale of Object.keys(messages)) {
        obj['pages'][page.name] = messages[locale];
        this.getI18n().mergeLocaleMessage(locale, obj);
      }
    }
  }
}

