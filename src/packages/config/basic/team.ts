export default class Team {
  tokens: boolean | null = null;
  roles!: { [key: string]: { [key: string]: string } } | null;

  public getTokens(): boolean | null {
    return this.tokens;
  }

  public getRoles(): { [key: string]: { [key: string]: string } } | null {
    return this.roles;
  }
}