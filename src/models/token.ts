import Model from './model';
import User from "./user";

export default class Token extends Model {
  public token: string | null = null;
  public note: string | null = null;
  public userId: number | null = null;
  public teamId: number | null = null;
  public user: User | null = null;

  public new: boolean = false;
}
