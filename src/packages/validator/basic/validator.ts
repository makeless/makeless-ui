import ValidatorMethod from '../validator-method';

export default class Validator {
  private validators: ValidatorMethod[];

  constructor(validators: ValidatorMethod[]) {
    this.validators = validators;
  }

  public isValid(): boolean {
    for (let i = 0; i < this.validators.length; i++) {
      if (this.validators[i]() !== true) {
        return false;
      }
    }

    return true;
  }

  public addValidators(validators: ValidatorMethod[]): void {
    this.validators.push(...validators);
  }

  public removeValidators(validators: ValidatorMethod[]): void {
    for (let i = 0; i < this.validators.length; i++) {
      for (let j = 0; j < validators.length; j++) {
        if (this.validators[i] === validators[j]) {
          this.validators.splice(i, 1);
        }
      }
    }
  }

  public setValidators(validators: ValidatorMethod[]): void {
    this.validators = validators;
  }

  public getValidators(): ValidatorMethod[] {
    return this.validators;
  }
}
