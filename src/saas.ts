import Vue from 'vue';
import VueRouter from 'vue-router';
import SaasComponent from '@/Saas.vue';
import RouterInterface from '@/packages/router/router';
import PageInterface from '@/packages/page/page';
import HomePage from '@/pages/home';

Vue.use(VueRouter);

export default class Saas {
  private router: RouterInterface;

  private pages: { [key: string]: PageInterface } = {
    'home': new HomePage(),
  };

  constructor(router: RouterInterface) {
    this.router = router;
  }

  private getPages(): PageInterface[] {
    const pages: PageInterface[] = [];

    for (const key of Object.keys(this.pages)) {
      pages.push(this.pages[key]);
    }

    return pages;
  }

  public setPage(key: string, page: PageInterface) {
    this.pages[key] = page;
  }

  public run(): Vue {
    return new Vue({
      render: (h) => h(SaasComponent),
      router: this.router.getRouter(this.getPages()),
    }).$mount('#app');
  }
}
