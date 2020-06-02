import {LocaleMessageObject} from 'vue-i18n';
import MemberComponent from '../../../components/pages/settings/member/MemberTeam.vue';
import messages from '../../../messages/pages/settings/member/member-team.json';

export default class MemberTeam {
  name: string = 'member-team';
  path: string = '/settings/team/member';
  component: any = MemberComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresTeam: true,
    requiresTeamOwner: true,
  };
}
