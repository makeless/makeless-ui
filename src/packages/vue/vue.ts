import Saas from '@/saas';
import Vue from 'vue';

export default class SaasVue extends Vue {
  public getSaas(): Saas {
    // @ts-ignore
    return this.$saas;
  }
}
