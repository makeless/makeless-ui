import Model from '@/models/model';
import Team from '@/models/team';

export default class User extends Model {
  public firstName: string | null = null;
  public lastName: string | null = null;
  public username: string | null = null;
  public password: string | null = null;
  public email: string | null = null;
  public teams: Team[] = [];

  public create(data: object): User {
    const user = new User();
    Object.assign(user, data);

    return user;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
