import {LocaleMessageObject} from 'vue-i18n';
import ProfileTeamComponent from './../../../components/pages/settings/profile/ProfileTeam.vue';
import messages from './../../../messages/pages/settings/profile/profile-team.json';
import Page from "../../page";

export default class ProfileTeam extends Page {
  name: string = 'profile-team';
  path: string = '/settings/team/profile';
  component: any = ProfileTeamComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresTeamAuth: true,
    requiresTeamRoleAuth: 'owner',
    requiresEnabledTeams: true,
  };
}
