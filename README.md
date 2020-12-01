# Makeless

Makeless - SaaS Framework - TypeScript & Vue.js Implementation

[![License](https://img.shields.io/badge/license-polyform:noncommercial-blue)](https://polyformproject.org/licenses/noncommercial/1.0.0/)
[![Build Status](https://ci.loeffel.io/api/badges/makeless/makeless-ui/status.svg)](https://ci.loeffel.io/makeless/makeless-ui)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui?ref=badge_shield)
<a href="https://www.npmjs.com/package/@makeless/makeless-ui"><img src="https://img.shields.io/npm/v/@makeless/makeless-ui.svg?sanitize=true" alt="Version"></a>
[![Discord](https://img.shields.io/discord/775684445314744341?label=discord)](https://discord.gg/K7Une7gndt) 

- Based on TypeScript, Vue.js & Bootstrap
- Concurrency safe & scalable
- Super clean and small
- Fully customizable and configurable
- Multilingual
- State of the art Authentication with JWT HttpOnly Cookies
- User management
- Team management
- Token management for users and teams
- Realtime events
- Subscriptions and Per-Seat Payments out of the box (coming soon)

## Preview

<img src="https://raw.githubusercontent.com/makeless/makeless-ui/master/preview.png" alt="logo">

## Backend

- Go: [https://github.com/makeless/makeless-go](https://github.com/makeless/makeless-go)

## Demo

- Go + TypeScript & Vue.js: [https://github.com/makeless/makeless-demo](https://github.com/makeless/makeless-demo)

## Usage

main.ts

```javascript
import Makeless from '@makeless/makeless-ui/src/makeless';

// packages
import Config from "@makeless/makeless-ui/src/packages/config/basic/config";
import Router from "@makeless/makeless-ui/src/packages/router/basic/router";
import Axios from "@makeless/makeless-ui/src/packages/http/axios/axios";
import I18n from "@makeless/makeless-ui/src/packages/i18n/basic/i18n";
import LocalStorage from "@makeless/makeless-ui/src/packages/storage/local-storage/local-storage";
import Event from "@makeless/makeless-ui/src/packages/event/basic/event";
import Security from "@makeless/makeless-ui/src/packages/security/basic/security";

// scss
import './scss/app.scss'

// config
import configuration from './../../makeless.json'

const config = new Config(configuration);
const router = new Router();
const http = new Axios({baseURL: config.getConfiguration().getHost()});
const i18n = new I18n(config.getConfiguration().getLocale());
const storage = new LocalStorage();
const event = new Event(config.getConfiguration().getHost());
const security = new Security(router, http, event, storage);

new Makeless(config, router, http, i18n, event, security)
    .init()
    .then(makeless => makeless.run());
```

## Config

Demo [makeless.json](https://github.com/makeless/makeless-demo/blob/master/makeless.json)

## License

- Makeless is licensed under the [Polyform Noncommercial](https://polyformproject.org/licenses/noncommercial/1.0.0/) license.  
- Exemption: Every contributor gets free access to a commercial license.  
- Please contact lucas@loeffel.io for a commercial license.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui?ref=badge_large)