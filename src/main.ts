import Saas from '@/saas';
import Router from '@/packages/router/basic/router';
import Axios from '@/packages/http/axios/axios';
import Master from '@/components/master/Master.vue';
import Security from '@/packages/security/basic/security';

const router = new Router();

const http = new Axios({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const security = new Security(router, http);

new Saas('Go SaaS', Master, router, http, security).run();
