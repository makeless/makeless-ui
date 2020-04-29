import ResponseInterface from '../http/response';
import ValidatorInterface from '../validator/validator';

export default interface Form {
  error: boolean;
  disabled: boolean;
  response: ResponseInterface | null;
  validator: ValidatorInterface | null;

  /**
   * Returns validator
   * @returns ValidatorInterface
   */
  getValidator(): ValidatorInterface
}
