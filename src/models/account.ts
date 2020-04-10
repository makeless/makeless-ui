export default class Account {
  public id: number;
  public name: string;
  public team: boolean;

  constructor(id: number, name: string, team: boolean) {
    this.id = id;
    this.name = name;
    this.team = team;
  }
}
