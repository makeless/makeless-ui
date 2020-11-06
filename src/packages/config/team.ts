export default interface Team {
  tokens: boolean | null;
  roles: { [key: string]: { [key: string]: string } } | null;

  getTokens(): boolean | null;

  getRoles(): { [key: string]: { [key: string]: string } } | null;
}