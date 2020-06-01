import NavigationInterface from "./navigation";
import TeamInterface from "./team";

export default interface Configuration {
  name: string;
  logo: string | null;
  locale: string;
  host: string;
  navigation: NavigationInterface;
  tokens: boolean | null;
  teams: TeamInterface | null;

  getName(): string;

  getLogo(): string | null;

  getLocale(): string;

  getHost(): string;

  getNavigation(): NavigationInterface;

  getTokens(): boolean | null;

  getTeams(): TeamInterface | null;
}