import {LocaleMessageObject} from 'vue-i18n';
import ProfileTeamComponent from './../../../components/pages/settings/profile/ProfileTeam.vue';
import messages from './../../../messages/pages/settings/profile/profile-team.json';

export default class ProfileTeam {
  name: string = 'profile-team';
  path: string = '/settings/team/profile';
  component: any = ProfileTeamComponent;
  messages: LocaleMessageObject | null = messages;
  meta: Object | null = {
    requiresAuth: true,
  };
}
