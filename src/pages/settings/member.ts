import {LocaleMessageObject} from 'vue-i18n';
import MemberComponent from './../../components/pages/settings/Member.vue';
import messages from './../../messages/pages/settings/member.json';

export default class Member {
  name: string = 'member';
  path: string = '/settings/team/member';
  component: any = MemberComponent;
  messages: LocaleMessageObject | null = messages;
  meta: Object | null = {
    requiresAuth: true,
    requiresTeamOwner: true,
  };
}
