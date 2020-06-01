import NavigationLegInterface from "./navigation-leg";

export default interface Navigation {
  left: NavigationLegInterface | null;
  right: NavigationLegInterface | null;

  getLeft(): NavigationLegInterface | null;

  getRight(): NavigationLegInterface | null;
}