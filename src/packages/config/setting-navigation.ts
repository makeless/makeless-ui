import SettingNavigationItem from './setting-navigation-item';

export default interface SettingNavigation {
  title: string | null;
  items: SettingNavigationItem[];

  getTitle(): string | null;

  getItems(): SettingNavigationItem[];
}