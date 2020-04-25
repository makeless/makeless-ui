import TeamsComponent from './../../../components/pages/settings/teams/Teams.vue';

export default class Teams {
  name: string = 'teams';
  path: string = '/settings/teams';
  component: any = TeamsComponent;
  meta: Object | null = {
    requiresAuth: true,
  };
}
