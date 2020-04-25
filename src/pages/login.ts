import LoginComponent from './../components/pages/Login.vue';

export default class Login {
  name: string = 'login';
  path: string = '/login';
  component: any = LoginComponent;
  meta: Object | null = {
    guest: true,
  };
}
