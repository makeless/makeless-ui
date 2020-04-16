import ProfileComponent from '@/components/pages/Profile.vue';

export default class Profile {
  name: string = 'profile';
  path: string = '/settings/profile';
  component: any = ProfileComponent;
  meta: Object | null = {
    requiresAuth: true,
  };
}
