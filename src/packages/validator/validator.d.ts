import ValidatorMethod from './validator-method';

export default interface Validator {
  /**
   * Returns validation status of all validation methods
   * @returns boolean
   */
  isValid: boolean

  /**
   * Retrieves all validators
   * @returns ValidatorMethod[]
   */
  getValidators(): ValidatorMethod[]
}
