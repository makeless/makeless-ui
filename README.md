# Makeless

Makeless - SaaS Framework - TypeScript & Vue.js Implementation

[![Build Status](https://ci.loeffel.io/api/badges/makeless/makeless-ui/status.svg)](https://ci.loeffel.io/makeless/makeless-ui)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui?ref=badge_shield)
<a href="https://www.npmjs.com/package/@makeless/makeless-ui"><img src="https://img.shields.io/npm/v/@makeless/makeless-ui.svg?sanitize=true" alt="Version"></a>

- Based on TypeScript, Vue.js & Bootstrap
- Concurrency safe & scalable
- Super clean and small
- Fully customizable and configurable
- Multilingual
- State of the art Authentication with JWT HttpOnly Cookies
- User management
- Team management
- Token management for users and teams
- Subscriptions and Per-Seat Payments out of the box (coming soon)

## License

Currently there is no license! We are working on this

- Will be free to use for personal or non profit organizations
- Will be non free for commercial use 
- Will include the [commons clause license](https://commonsclause.com)
- Every contributor will get unlimited commercial licenses

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

makeless.json

```json
{
  "name": "Makeless",
  "logo": null,
  "locale": "en",
  "host": "http://localhost:3000",
  "emailVerification": true,
  "mail": {
    "name": "Makeless",
    "logo": null,
    "from": "Makeless <info@makeless.io>",
    "link": "http://localhost",
    "buttonColor": "#4586ab",
    "buttonTextColor": "#FFFFFF",
    "texts": {
      "en": {
        "greeting": "Hello",
        "signature": "Best Regards",
        "copyright": "Copyright © 2020 Makeless. All rights reserved."
      }
    }
  },
  "tokens": true,
  "navigation": {
    "left": {
      "en": [
        {
          "label": "Dashboard",
          "to": "dashboard"
        }
      ]
    },
    "right": {
      "en": [
        {
          "label": "GitHub",
          "to": "https://github.com/makeless",
          "external": true
        },
        {
          "label": "Login",
          "to": "login"
        },
        {
          "label": "Register",
          "to": "register"
        }
      ]
    }
  },
  "settingsNavigation": {
    "en": [
      {
        "title": "Settings",
        "items": [
          {
            "label": "Profile",
            "to": "profile"
          },
          {
            "label": "Password",
            "to": "password"
          },
          {
            "label": "Teams",
            "to": "team"
          },
          {
            "label": "Team Invitations",
            "to": "team-invitation"
          },
          {
            "label": "Tokens",
            "to": "token"
          }
        ]
      }
    ]
  },
  "teams": {
    "tokens": true,
    "roles": {
      "owner": {
        "en": "Owner"
      },
      "user": {
        "en": "User"
      }
    },
    "settingsNavigation": {
      "en": [
        {
          "title": "Settings",
          "items": [
            {
              "label": "Profile",
              "to": "profile"
            },
            {
              "label": "Users",
              "to": "team-user-team"
            },
            {
              "label": "Tokens",
              "to": "token"
            },
            {
              "label": "Pending invitations",
              "to": "team-invitation"
            }
          ]
        }
      ]
    }
  }
}
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmakeless%2Fmakeless-ui?ref=badge_large)