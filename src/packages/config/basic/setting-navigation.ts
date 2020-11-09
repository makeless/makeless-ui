import SettingNavigationItem from './setting-navigation-item';

export default class SettingNavigation {
  title: string | null = null;
  items!: SettingNavigationItem[];

  public getTitle(): string | null {
    return this.title;
  }

  public getItems(): SettingNavigationItem[] {
    return this.items;
  }
}