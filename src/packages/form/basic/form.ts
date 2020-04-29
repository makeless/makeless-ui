import ResponseInterface from './../../http/response';
import ValidatorInterface from './../../validator/validator';

export default class Form {
  error: boolean = false;
  disabled: boolean = false;
  response: ResponseInterface | null = null;
  validator: ValidatorInterface;

  constructor(validator: ValidatorInterface) {
    this.validator = validator;
  }

  public getValidator(): ValidatorInterface {
    return this.validator;
  }
}
