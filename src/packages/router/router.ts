import VueRouter from 'vue-router';
import PageInterface from '@/packages/page/page';

export default interface Router {
  mode: any;
  base: string;

  getRouter(pages: PageInterface[]): VueRouter;
};
