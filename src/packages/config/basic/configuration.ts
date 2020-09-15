import Navigation from './navigation';
import Team from './team';

export default class Configuration {
  name!: string;
  logo: string | null = null;
  locale!: string;
  host!: string;
  tokens: boolean | null = null;
  teams: Team | null = null;
  navigation!: Navigation;

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

  public getTokens(): boolean | null {
    return this.tokens;
  }

  public getTeams(): Team | null {
    return this.teams;
  }

  public getNavigation(): Navigation {
    return this.navigation;
  }
}