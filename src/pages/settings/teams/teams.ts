import {LocaleMessageObject} from 'vue-i18n';
import TeamsComponent from './../../../components/pages/settings/teams/Teams.vue';

export default class Teams {
  name: string = 'teams';
  path: string = '/settings/teams';
  component: any = TeamsComponent;
  messages: LocaleMessageObject | null = null;
  meta: Object | null = {
    requiresAuth: true,
  };
}
