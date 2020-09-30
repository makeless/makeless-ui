import {LocaleMessageObject} from 'vue-i18n';
import TeamInvitationTeamComponent from './../../../components/pages/settings/team-invitation/TeamInvitationTeam.vue';
import messages from './../../../messages/pages/settings/team-invitation/team-invitation-team.json';
import Page from "../../page";

export default class TeamInvitation extends Page {
  name: string = 'team-invitation-team';
  path: string = '/settings/team/team-invitation';
  component: any = TeamInvitationTeamComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresEnabledTeams: true,
  };
}
