import DashboardComponent from '@/components/pages/Dashboard.vue';

export default class Home {
  name: string = 'dashboard';
  path: string = '/dashboard';
  component: any = DashboardComponent;
  meta: Object | null = {
    requiresAuth: true,
  };
}
