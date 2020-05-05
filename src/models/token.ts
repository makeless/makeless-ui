import Model from './model';

export default class Token extends Model {
  public token: string | null = null;
  public note: string | null = null;
  public userId: number | null = null;
  public teamId: number | null = null;

  public new: boolean = false;
}
