import {LocaleMessageObject} from 'vue-i18n';
import TokenComponent from './../../../components/pages/settings/token/TokenTeam.vue';
import messages from './../../../messages/pages/settings/token/token-team.json';

export default class TokenTeam {
  name: string = 'token-team';
  path: string = '/settings/team/token';
  component: any = TokenComponent;
  messages: LocaleMessageObject | null = messages;
  meta: Object | null = {
    requiresAuth: true,
    requiresTeamOwner: true,
  };
}
