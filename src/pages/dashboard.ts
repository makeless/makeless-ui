import DashboardComponent from '@/components/pages/Dashboard.vue';

export default class Dashboard {
  name: string = 'dashboard';
  path: string = '/dashboard';
  component: any = DashboardComponent;
  meta: Object | null = {
    requiresAuth: true,
  };
}
