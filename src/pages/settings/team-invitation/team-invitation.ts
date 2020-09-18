import {LocaleMessageObject} from 'vue-i18n';
import TeamInvitationComponent from './../../../components/pages/settings/team-invitation/TeamInvitation.vue';
import messages from './../../../messages/pages/settings/team-invitation/team-invitation.json';
import Page from "../../page";

export default class TeamInvitation extends Page {
  name: string = 'team-invitation';
  path: string = '/settings/team-invitation';
  component: any = TeamInvitationComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresEnabledTeams: true,
  };
}
