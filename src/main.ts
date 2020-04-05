import Saas from '@/saas';
import Router from '@/packages/router/basic/router';

const saas = new Saas(
    new Router(),
);

saas.run();
