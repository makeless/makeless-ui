import Model from './model';
import User from './user';
import Team from './team';

export default class TeamInvitation extends Model {
  teamId: number | null = null;
  team: Team | null = null;

  userId: number | null = null;
  user: User | null = null;

  email: string | null = null;
  token: string | null = null;
  expire: Date | null = null;
  accepted: boolean | null = null;

  isLoadingAccept: boolean | null = false;
  isLoadingDelete: boolean | null = false;
}