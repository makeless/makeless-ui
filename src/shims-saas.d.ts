import Makeless from './saas';

declare module 'vue/types/vue' {
  interface Vue {
    $saas: Makeless;
  }
}
