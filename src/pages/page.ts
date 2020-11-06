import {LocaleMessageObject} from 'vue-i18n';
import {VueConstructor} from 'vue';

export default abstract class Page {
  name!: string;
  path!: string;
  component!: VueConstructor;
  messages: LocaleMessageObject | null = null;
  meta: any | null = null;

  getName(): string {
    return this.name;
  }

  getPath(): string {
    return this.path;
  }

  getComponent(): VueConstructor {
    return this.component;
  }

  getMessages(): LocaleMessageObject | null {
    return this.messages;
  }

  getMeta(): any | null {
    return this.meta;
  }
}