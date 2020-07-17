import Model from './../models/model';
import TeamUser from './team-user';

export default class Team extends Model {
  public name: string | null = null;
  public userId: number | null = null;

  public teamUsers: TeamUser[] = [];
}
