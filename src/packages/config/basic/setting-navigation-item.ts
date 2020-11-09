export default class SettingNavigationItem {
  label!: string;
  to!: string;
  external: boolean = false;

  public getLabel(): string {
    return this.label;
  }

  public getTo(): string {
    return this.to;
  }

  public isExternal(): boolean {
    return this.external;
  }
}