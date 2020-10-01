import {LocaleMessageObject} from 'vue-i18n';
import TeamUserTeamComponent from '../../../components/pages/settings/team-user/TeamUserTeam.vue';
import messages from '../../../messages/pages/settings/team-user/team-user-team.json';
import Page from "../../page";

export default class TeamUserTeam extends Page {
  name: string = 'team-user-team';
  path: string = '/settings/team/team-user';
  component: any = TeamUserTeamComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresTeamRoleAuth: 'owner',
    requiresEnabledTeams: true,
  };
}
