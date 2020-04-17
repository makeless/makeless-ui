import Model from '@/models/model';
import Team from '@/models/team';

export default class User extends Model {
  public name: string | null = null;
  public username: string | null = null;
  public password: string | null = null;
  public email: string | null = null;
  public teams: Team[] = [];

  public create(data: any): User {
    return Object.assign(new User(), {
      name: data.name,
      username: data.username,
      password: null,
      email: data.email,
      teams: data.teams,
    });
  }

  public getName(): string | null {
    return this.name;
  }

  public hasTeams(): boolean {
    return this.teams.length > 0;
  }
}
