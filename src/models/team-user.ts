import Model from './model';
import User from './user';
import Team from './team';

export default class TeamUser extends Model {
  teamId: number | null = null;
  team: Team | null = null;

  userId: number | null = null;
  user: User | null = null;

  role: string | null = null;
}