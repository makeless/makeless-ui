export default interface Team {
  tokens: boolean | null;
  roles: string[] | null;

  getTokens(): boolean | null;
  getRoles(): string[] | null;
}