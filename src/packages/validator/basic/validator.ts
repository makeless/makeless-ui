export default class Validator {
  private error: boolean = false;

  public isValid(): boolean {
    return !this.error;
  }

  public setError(error: boolean): void {
    this.error = error;
  }
}
