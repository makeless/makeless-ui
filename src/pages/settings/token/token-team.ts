import {LocaleMessageObject} from 'vue-i18n';
import TokenComponent from './../../../components/pages/settings/token/TokenTeam.vue';
import messages from './../../../messages/pages/settings/token/token-team.json';
import Page from "../../page";

export default class TokenTeam extends Page {
  name: string = 'token-team';
  path: string = '/settings/team/token';
  component: any = TokenComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresTeamAuth: true,
    requiresTeamRoleAuth: 'owner',
    requiresEnabledTokens: true,
    requiresEnabledTeams: true,
  };
}
