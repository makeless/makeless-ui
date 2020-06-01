import ConfigurationInterface from "./configuration";
import Configuration from "./configuration";
import Navigation from "./navigation";
import Team from "./team";
import NavigationItem from "./navigation-item";

export default class Config {
  configuration: ConfigurationInterface;

  constructor(config: any) {
    let obj = Object.assign(new Configuration(), config);
    this.assignNavigation(obj);
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

      for (let locale in leg) {
        if (!leg.hasOwnProperty(locale)) {
          continue;
        }

        for (let j = 0; j < leg[locale].length; j++) {
          leg[locale][j] = Object.assign(new NavigationItem(), leg[locale][j]);

          if (!leg[locale][j].hasChildren()) {
            continue
          }

          for (let k = 0; k < leg[locale][j].getChildren()!.length; k++) {
            leg[locale][j].getChildren()![k] = Object.assign(new NavigationItem(), leg[locale][j].getChildren()![k]);
          }
        }
      }
    }
  }

  protected assignTeams(obj: Configuration) {
    if (obj.teams === null) {
      return;
    }

    obj.teams = Object.assign(new Team(), obj.teams);
  }

  public getConfiguration(): ConfigurationInterface {
    return this.configuration;
  }
}