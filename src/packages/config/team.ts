export default interface Team {
  tokens: boolean | null;
  roles: { [key: string]: { [key: string]: string } };

  getTokens(): boolean | null;

  getRoles(): { [key: string]: { [key: string]: string } };

  getRole(role: string): { [key: string]: string };
}