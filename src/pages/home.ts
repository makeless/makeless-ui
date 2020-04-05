import HomeComponent from '@/components/pages/Home.vue';

export default class Home {
  name: string = 'home';
  path: string = '/';
  auth: boolean = false;
  component: any = HomeComponent;
}
