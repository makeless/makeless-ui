import Model from './../models/model';
import User from './user';

export default class EmailVerification extends Model {
  public token: string | null = null;
  public verified: boolean | null = null;

  public userId: number | null = null;
  public user: User | null = null;
}
