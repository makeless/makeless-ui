export default class Team {
  tokens: boolean | null = null;
  roles: string[] | null = null;

  public getTokens(): boolean | null {
    return this.tokens;
  }

  public getRoles(): string[] | null {
    return this.roles;
  }
}