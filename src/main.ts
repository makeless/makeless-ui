import Saas from '@/saas';
import Router from '@/packages/router/basic/router';
import Axios from '@/packages/http/axios/axios';
import Master from '@/components/master/Master.vue';

const saas = new Saas(
    'Go SaaS',
    new Router(),
    new Axios(),
    Master,
);

saas.run();
