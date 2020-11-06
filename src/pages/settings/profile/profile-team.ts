import {LocaleMessageObject} from 'vue-i18n';
import ProfileTeamComponent from './../../../components/pages/settings/profile/ProfileTeam.vue';
import messages from './../../../messages/pages/settings/profile/profile-team.json';
import Page from '../../page';
import {VueConstructor} from 'vue';

export default class ProfileTeam extends Page {
  name: string = 'profile-team';
  path: string = '/settings/team/profile';
  component: VueConstructor = ProfileTeamComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresTeamRoleAuth: 'owner',
    requiresEnabledTeams: true,
  };
}
