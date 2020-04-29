import {LocaleMessageObject} from 'vue-i18n';
import TeamsComponent from './../../../components/pages/settings/teams/Teams.vue';
import messages from './../../../messages/pages/settings/teams/teams.json';

export default class Teams {
  name: string = 'teams';
  path: string = '/settings/teams';
  component: any = TeamsComponent;
  messages: LocaleMessageObject | null = messages;
  meta: Object | null = {
    requiresAuth: true,
  };
}
