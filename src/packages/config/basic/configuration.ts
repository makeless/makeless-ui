import Navigation from "./navigation";
import Team from "./team";

export default class Configuration {
  name!: string;
  logo: string | null = null;
  locale!: string;
  host!: string;
  navigation!: Navigation;
  tokens: boolean | null = null;
  teams: Team | null = null;

  public getName(): string {
    return this.name;
  }

  public getLogo(): string | null {
    return this.logo;
  }

  public getLocale(): string {
    return this.locale;
  }

  public getHost(): string {
    return this.host;
  }

  public getNavigation(): Navigation {
    return this.navigation;
  }

  public getTokens(): boolean | null {
    return this.tokens;
  }

  public getTeams(): Team | null {
    return this.teams;
  }
}