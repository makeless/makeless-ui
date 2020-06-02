# go-saas-ui

Go SaaS UI - SaaS TypeScript Vue Framework

[![Build Status](https://ci.loeffel.io/api/badges/go-saas/go-saas-ui/status.svg)](https://ci.loeffel.io/go-saas/go-saas-ui)

## Usage

```javascript
import Saas from '@go-saas/go-saas-ui/src/saas';

// packages
import Config from "@go-saas/go-saas-ui/src/packages/config/basic/config";
import Router from "@go-saas/go-saas-ui/src/packages/router/basic/router";
import Axios from "@go-saas/go-saas-ui/src/packages/http/axios/axios";
import I18n from "@go-saas/go-saas-ui/src/packages/i18n/basic/i18n";
import LocalStorage from "@go-saas/go-saas-ui/src/packages/storage/local-storage/local-storage";
import Event from "@go-saas/go-saas-ui/src/packages/event/basic/event";
import Security from "@go-saas/go-saas-ui/src/packages/security/basic/security";

// components
import Master from "@go-saas/go-saas-ui/src/components/layouts/Master.vue";

// scss
import './scss/app.scss'

// config
import configuration from './../../go-saas.json'

const config = new Config(configuration);
const router = new Router();
const http = new Axios({baseURL: config.getConfiguration().getHost()});
const i18n = new I18n(config.getConfiguration().getLocale());
const storage = new LocalStorage();
const event = new Event(config.getConfiguration().getHost());
const security = new Security(router, http, event, storage);

new Saas(config, Master, router, http, i18n, event, security)
    .init()
    .run();
```
