import {LocaleMessageObject} from 'vue-i18n';
import TeamComponent from './../../components/pages/settings/Team.vue';
import messages from './../../messages/pages/settings/team.json';
import Page from '../page';
import {VueConstructor} from 'vue';

export default class Team extends Page {
  name: string = 'team';
  path: string = '/settings/team';
  component: VueConstructor = TeamComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
    requiresUserAuth: true,
    requiresEnabledTeams: true,
  };
}
