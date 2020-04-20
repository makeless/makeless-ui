import ProfileTeamComponent from '@/components/pages/settings/profile/ProfileTeam.vue';

export default class ProfileTeam {
  name: string = 'profile-team';
  path: string = '/settings/team/profile';
  component: any = ProfileTeamComponent;
  meta: Object | null = {
    requiresAuth: true,
    teamOnly: true,
  };
}
