import {LocaleMessageObject} from 'vue-i18n';
import InvitationComponent from './../../components/pages/settings/Invitation.vue';
import messages from './../../messages/pages/settings/invitation.json';
import Page from "../page";

export default class Invitation extends Page {
  name: string = 'invitation';
  path: string = '/settings/invitation';
  component: any = InvitationComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresEnabledTeams: true,
  };
}
