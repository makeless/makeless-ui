import {LocaleMessageObject} from 'vue-i18n';
import {VueConstructor} from "vue";

export default interface Page {
  name: string;
  path: string;
  component: VueConstructor;
  messages: LocaleMessageObject | null;
  meta: any | null;

  getName(): string

  getPath(): string

  getComponent(): VueConstructor

  getMessages(): LocaleMessageObject | null

  getMeta(): any | null
}
