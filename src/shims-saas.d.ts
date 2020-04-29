import Saas from './saas';

declare module 'vue/types/vue' {
  interface Vue {
    $saas: Saas;
    userLoaded: boolean;

    onUserLoaded(): void
  }
}
