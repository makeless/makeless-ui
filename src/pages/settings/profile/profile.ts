import ProfileComponent from './../../../components/pages/settings/profile/Profile.vue';

export default class Profile {
  name: string = 'profile';
  path: string = '/settings/profile';
  component: any = ProfileComponent;
  meta: Object | null = {
    requiresAuth: true,
  };
}
