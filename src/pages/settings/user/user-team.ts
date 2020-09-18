import {LocaleMessageObject} from 'vue-i18n';
import UserComponent from '../../../components/pages/settings/user/UserTeam.vue';
import messages from '../../../messages/pages/settings/user/user-team.json';
import Page from "../../page";

export default class UserTeam extends Page {
  name: string = 'user-team';
  path: string = '/settings/team/user';
  component: any = UserComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresTeamRoleAuth: 'owner',
    requiresEnabledTeams: true,
  };
}
