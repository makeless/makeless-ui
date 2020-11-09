import SettingNavigation from './setting-navigation';

export default interface Team {
  tokens: boolean | null;
  roles: { [key: string]: { [key: string]: string } };
  settingsNavigation: { [key: string]: SettingNavigation[] }

  getTokens(): boolean | null;

  getRoles(): { [key: string]: { [key: string]: string } };

  getRole(role: string): { [key: string]: string };

  getSettingsNavigation(): { [key: string]: SettingNavigation[] };
}