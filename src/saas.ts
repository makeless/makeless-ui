import Vue from 'vue';
import VueRouter from 'vue-router';
import SaasComponent from '@/Saas.vue';
import RouterInterface from '@/packages/router/router';
import PageInterface from '@/packages/page/page';
import HomePage from '@/pages/home';

export default class Saas {
  private router: RouterInterface;
  private readonly master: any;

  private pages: { [key: string]: PageInterface } = {
    'home': new HomePage(),
  };

  constructor(router: RouterInterface, master: any) {
    this.router = router;
    this.master = master;
  }

  private preload(): void {
    Vue.use(VueRouter);
    Vue.component('master', this.master);
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
    this.preload();

    return new Vue({
      render: (h) => h(SaasComponent),
      router: this.router.getRouter(this.getPages()),
    }).$mount('#app');
  }
}
