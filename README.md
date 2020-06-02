# go-saas-ui

Go SaaS UI - SaaS TypeScript Vue Framework

[![Build Status](https://ci.loeffel.io/api/badges/go-saas/go-saas-ui/status.svg)](https://ci.loeffel.io/go-saas/go-saas-ui)
<a href="https://www.npmjs.com/package/@go-saas/go-saas-ui"><img src="https://img.shields.io/npm/v/@go-saas/go-saas-ui.svg?sanitize=true" alt="Version"></a>

- Based on TypeScript, Vue.js & Bootstrap 4
- Super clean and small
- Fully customizable and configurable
- State of the art Authentication with JWT HttpOnly Cookies
- Team management
- Token management for users and teams

## Preview

<img src="https://raw.githubusercontent.com/go-saas/go-saas-ui/master/preview.png" alt="logo">

## Usage

main.ts

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

new Saas(config, router, http, i18n, event, security)
    .init()
    .run();
```

## Config

go-saas.json

```json
{
  "name": "Go SaaS",
  "logo": "https://images.prismic.io/www-static/49aa0a09-06d2-4bba-ad20-4bcbe56ac507_logo.png?auto=compress,format",
  "locale": "en",
  "host": "http://localhost:3000",
  "tokens": true,
  "teams": {
    "tokens": false
  },
  "navigation": {
    "left": {
      "en": [
        {"label": "Dashboard","to": "dashboard"}
      ]
    },
    "right": {
      "en": [
        {"label": "Login","to": "login"}
      ]
    }
  }
}
```
