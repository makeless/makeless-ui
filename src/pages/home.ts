import HomeComponent from '@/components/pages/Home.vue';

export default class Home {
  name: string = 'home';
  path: string = '/';
  component: any = HomeComponent;
  meta: Object | null = null;
}
