import StateInterface from '../state';

export default abstract class State implements StateInterface {
  state: any = {};

  getState(): any {
    return this.state;
  }
}