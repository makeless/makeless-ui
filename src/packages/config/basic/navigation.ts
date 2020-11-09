import NavigationItem from '../navigation-item';

export default class Navigation {
  left: { [key: string]: NavigationItem[] } | null = null;
  right: { [key: string]: NavigationItem[] } | null = null;

  public getLeft(): { [key: string]: NavigationItem[] } | null {
    return this.left;
  }

  public getRight(): { [key: string]: NavigationItem[] } | null {
    return this.right;
  }
}