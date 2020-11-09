import SettingNavigation from '../setting-navigation';

export default class Team {
  tokens: boolean | null = null;
  roles!: { [key: string]: { [key: string]: string } };
  settingsNavigation!: { [key: string]: SettingNavigation[] };

  public getTokens(): boolean | null {
    return this.tokens;
  }

  public getRoles(): { [key: string]: { [key: string]: string } } {
    return this.roles;
  }

  public getRole(role: string): { [key: string]: string } {
    return this.roles[role];
  }

  getSettingsNavigation(): { [key: string]: SettingNavigation[] } {
    return this.settingsNavigation;
  }
}