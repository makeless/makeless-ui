import Makeless from './makeless';

declare module 'vue/types/vue' {
  interface Vue {
    $makeless: Makeless;
  }
}
