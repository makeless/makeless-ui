import Model from './../models/model';
import TeamUser from './team-user';

export default class User extends Model {
  public name: string | null = null;
  public password: string | null = null;
  public email: string | null = null;
  public teamUsers: TeamUser[] = [];

  public create(data: any): User {
    return Object.assign(new User(), data);
  }

  public getName(): string | null {
    return this.name;
  }

  public hasTeams(): boolean {
    return this.teamUsers.length > 0;
  }
}
