import NavigationLegInterface from "../navigation-leg";

export default class Navigation {
  left: NavigationLegInterface | null = null;
  right: NavigationLegInterface | null = null;

  public getLeft(): NavigationLegInterface | null {
    return this.left;
  }

  public getRight(): NavigationLegInterface | null {
    return this.right;
  }
}