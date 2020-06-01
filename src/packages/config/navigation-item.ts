export default interface NavigationItem {
  label: string;
  to: string;
  external: boolean;
  children: NavigationItem[] | null;

  getLabel(): string

  getTo(): string;

  isExternal(): boolean;

  getChildren(): NavigationItem[] | null;

  hasChildren(): boolean;
}