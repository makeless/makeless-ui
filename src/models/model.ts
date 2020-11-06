import State from '../packages/state/basic/state';

export default abstract class Model extends State {
  public id: number | null = null;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
}
