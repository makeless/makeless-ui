# go-saas-ui

Go SaaS UI - Extendable SaaS TypeScript Vue Package

[![Build Status](https://ci.loeffel.io/api/badges/go-saas/go-saas-ui/status.svg)](https://ci.loeffel.io/go-saas/go-saas-ui)

## Usage

```javascript
import Saas from '@go-saas/go-saas-ui/src/saas';

// packages
import Router from "@go-saas/go-saas-ui/src/packages/router/basic/router";
import Axios from "@go-saas/go-saas-ui/src/packages/http/axios/axios";
import LocalStorage from "@go-saas/go-saas-ui/src/packages/storage/local-storage/local-storage";
import Security from "@go-saas/go-saas-ui/src/packages/security/basic/security";

// components
import Master from "@go-saas/go-saas-ui/src/components/master/Master.vue";

// scss
import '@go-saas/go-saas-ui/src/scss/app.scss'

const storage = new LocalStorage();
const router = new Router();
const http = new Axios({
    baseURL: 'http://backend:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

new Saas(
    'Go SaaS',
    Master,
    router,
    http,
    new Security(router, http, storage),
).run();
```
