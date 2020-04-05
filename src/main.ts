import Saas from '@/saas';
import Router from '@/packages/router/basic/router';
import Master from '@/components/master/Master.vue';

const saas = new Saas(
    'Go SaaS',
    new Router(),
    Master,
);

saas.run();
