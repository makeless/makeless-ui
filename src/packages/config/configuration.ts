import NavigationInterface from './navigation';
import TeamInterface from './team';
import SettingNavigation from './setting-navigation';

export default interface Configuration {
  name: string;
  logo: string | null;
  locale: string;
  host: string;
  tokens: boolean | null;
  teams: TeamInterface | null;
  navigation: NavigationInterface;
  settingsNavigation: { [key: string]: SettingNavigation[] };

  getName(): string;

  getLogo(): string | null;

  getLocale(): string;

  getHost(): string;

  getTokens(): boolean | null;

  getTeams(): TeamInterface | null;

  getNavigation(): NavigationInterface;

  getSettingsNavigation(): { [key: string]: SettingNavigation[] };
}