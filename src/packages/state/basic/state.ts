export default abstract class State {
  state: any;

  getState(): any {
    return this.state;
  }
}