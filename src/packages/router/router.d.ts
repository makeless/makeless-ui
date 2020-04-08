import VueRouter from 'vue-router';
import PageInterface from '@/packages/page/page';

export default interface Router {
  mode: any;
  base: string;

  createRouter(pages: PageInterface[]): VueRouter;
}
