import {LocaleMessageObject} from 'vue-i18n';
import ProfileTeamComponent from './../../../components/pages/settings/profile/ProfileTeam.vue';

export default class ProfileTeam {
  name: string = 'profile-team';
  path: string = '/settings/team/profile';
  component: any = ProfileTeamComponent;
  messages: LocaleMessageObject | null = null;
  meta: Object | null = {
    requiresAuth: true,
  };
}
