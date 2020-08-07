import ValidatorMethod from '../validator-method';

export default class Validator {
  private readonly validators: ValidatorMethod[];

  constructor(validators: ValidatorMethod[]) {
    this.validators = validators;
  }

  public get isValid(): boolean {
    for (let i = 0; i < this.validators.length; i++) {
      if (this.validators[i]() !== true) {
        return false;
      }
    }

    return true;
  }

  public getValidators(): ValidatorMethod[] {
    return this.validators;
  }
}
