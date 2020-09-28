import Model from '../models/model';

export default class Invitation extends Model {
  public name: string | null = null;
  public email: string | null = null;
  public password: string | null = null;
  public passwordConfirmation: string | null = null;
  public legalConfirmation: boolean | null = null;
}
