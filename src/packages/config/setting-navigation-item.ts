export default interface SettingNavigationItem {
  label: string;
  to: string;
  external: boolean;

  getLabel(): string

  getTo(): string;

  isExternal(): boolean;
}