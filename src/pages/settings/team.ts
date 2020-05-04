import {LocaleMessageObject} from 'vue-i18n';
import TeamComponent from './../../components/pages/settings/Team.vue';
import messages from './../../messages/pages/settings/team.json';

export default class Team {
  name: string = 'team';
  path: string = '/settings/team';
  component: any = TeamComponent;
  messages: LocaleMessageObject | null = messages;
  meta: Object | null = {
    requiresAuth: true,
  };
}
