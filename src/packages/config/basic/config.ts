import ConfigInterface from '../config';
import ConfigurationInterface from './configuration';
import Configuration from './configuration';
import Navigation from './navigation';
import Team from './team';
import NavigationItem from './navigation-item';
import SettingNavigation from './setting-navigation';
import SettingNavigationItem from './setting-navigation-item';

export default class Config implements ConfigInterface {
  configuration: ConfigurationInterface;

  constructor(config: any) {
    const obj = Object.assign(new Configuration(), config);
    this.assignNavigation(obj);
    this.assignSettingsNavigation(obj);
    this.assignTeams(obj);
    this.configuration = obj;
  }

  protected assignNavigation(obj: Configuration) {
    if (obj.navigation === null) {
      return;
    }

    obj.navigation = Object.assign(new Navigation(), obj.navigation);
    const legs = Object.values(obj.navigation);

    for (let i = 0; i < legs.length; i++) {
      const leg = Object.values(obj.navigation)[i];

      for (const locale in leg) {
        if (!Object.prototype.hasOwnProperty.call(leg, locale)) {
          continue;
        }

        for (let j = 0; j < leg[locale].length; j++) {
          leg[locale][j] = Object.assign(new NavigationItem(), leg[locale][j]);

          if (!leg[locale][j].hasChildren()) {
            continue;
          }

          for (let k = 0; k < leg[locale][j].getChildren()!.length; k++) {
            leg[locale][j].getChildren()![k] = Object.assign(new NavigationItem(), leg[locale][j].getChildren()![k]);
          }
        }
      }
    }
  }

  protected assignSettingsNavigation(obj: any) {
    const locales = Object.keys(obj.settingsNavigation);

    for (let i = 0; i < locales.length; i++) {
      for (const j in obj.settingsNavigation[locales[i]]) {
        if (!Object.prototype.hasOwnProperty.call(obj.settingsNavigation[locales[i]], j)) {
          break;
        }

        obj.settingsNavigation[locales[i]][j] = Object.assign(new SettingNavigation(), obj.settingsNavigation[locales[i]][j]);
        for (let k = 0; k < obj.settingsNavigation[locales[i]][j].items.length; k++) {
          obj.settingsNavigation[locales[i]][j].items[k] = Object.assign(
              new SettingNavigationItem(),
              obj.settingsNavigation[locales[i]][j].items[k],
          );
        }
      }
    }
  }

  protected assignTeams(obj: Configuration) {
    if (obj.teams === null) {
      return;
    }

    obj.teams = Object.assign(new Team(), obj.teams);
    this.assignSettingsNavigation(obj.teams);
  }

  public getConfiguration(): ConfigurationInterface {
    return this.configuration;
  }
}