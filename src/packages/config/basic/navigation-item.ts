export default class NavigationItem {
  label!: string
  to!: string;
  external: boolean = false;
  children: NavigationItem[] | null = null;

  public getLabel(): string {
    return this.label;
  }

  public getTo(): string {
    return this.to;
  }

  public isExternal(): boolean {
    return this.external;
  }

  public getChildren(): NavigationItem[] | null {
    return this.children;
  }

  public hasChildren(): boolean {
    if (this.children === null) {
      return false;
    }

    return this.children.length !== 0
  }
}