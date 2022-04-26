import ValidatorInterface from '../validator';
import ValidatorMethodInterface from '../validator-method';

export default class Validator implements ValidatorInterface {
  private validators: ValidatorMethodInterface[];

  constructor(validators: ValidatorMethodInterface[]) {
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

  public addValidators(validators: ValidatorMethodInterface[]): void {
    this.validators.push(...validators);
  }

  public setValidators(validators: ValidatorMethodInterface[]): void {
    this.validators = validators;
  }

  public getValidators(): ValidatorMethodInterface[] {
    return this.validators;
  }
}
