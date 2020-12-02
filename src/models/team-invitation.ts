import Model from './model';
import Team from './team';
import TeamUser from './team-user';

export default class TeamInvitation extends Model {
  teamId: number | null = null;
  team: Team | null = null;

  teamUserId: number | null = null;
  teamUser: TeamUser | null = null;

  email: string | null = null;
  token: string | null = null;
  expire: Date | null = null;
  accepted: boolean | null = null;
}