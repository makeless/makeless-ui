import Model from './../models/model';
import TeamUser from './team-user';
import EmailVerification from './email-verification';

export default class User extends Model {
  public name: string | null = null;
  public password: string | null = null;
  public email: string | null = null;
  public emailVerification: EmailVerification | null = null;
  public teamUsers: TeamUser[] = [];

  public create(data: any): User {
    return Object.assign(new User(), data);
  }

  public getName(): string | null {
    return this.name;
  }

  public getEmail(): string | null {
    return this.email;
  }

  public hasTeams(): boolean {
    return this.teamUsers.length > 0;
  }

  public isVerified(): boolean | null {
    if (this.emailVerification === null) {
      return null;
    }

    return this.emailVerification.verified;
  }
}
