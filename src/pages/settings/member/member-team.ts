import {LocaleMessageObject} from 'vue-i18n';
import MemberComponent from '../../../components/pages/settings/member/MemberTeam.vue';
import messages from '../../../messages/pages/settings/member/member-team.json';
import Page from "../../page";

export default class MemberTeam extends Page {
  name: string = 'member-team';
  path: string = '/settings/team/member';
  component: any = MemberComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresTeamAuth: true,
    requiresTeamOwnerAuth: true,
    requiresEnabledTeams: true,
  };
}
