import Model from './../models/model';

export default class Profile extends Model {
  public name: string | null = null;

  public getName(): string | null {
    return this.name;
  }
}
