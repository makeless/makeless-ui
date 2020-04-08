import Model from '@/models/model';

export default class User extends Model {
  public firstName: string | null = null;
  public lastName: string | null = null;
  public username: string | null = null;
  public password: string | null = null;
  public email: string | null = null;
}
