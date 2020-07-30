import User from '../models/user';

export default class TokenTeamCreate {
  note: string | null = null;
  token: string | null = null;
  userId: number | null = null;

  user: User | null = null;
}