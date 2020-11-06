import {LocaleMessageObject} from 'vue-i18n';
import InvitationComponent from './../components/pages/Invitation.vue';
import messages from './../messages/pages/invitation.json';
import Page from './page';
import {VueConstructor} from 'vue';

export default class Invitation extends Page {
  name: string = 'invitation';
  path: string = '/invitation';
  component: VueConstructor = InvitationComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    guest: true,
  };
}
