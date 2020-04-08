import VueRouter from 'vue-router';
import PageInterface from '@/packages/page/page';

export default interface Router {
  mode: any;
  base: string;
  router: VueRouter | null;

  create(pages: PageInterface[]): void;

  getRouter(): VueRouter
}
