import PageNotFoundComponent from '@/components/pages/PageNotFound.vue';

export default class PageNotFound {
  name: string = 'page-not-found';
  path: string = '*';
  component: any = PageNotFoundComponent;
  meta: Object | null = null;
}
