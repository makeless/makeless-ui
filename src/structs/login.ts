import Model from '../models/model';

export default class Login extends Model {
  public email: string | null = null;
  public password: string | null = null;
}
