import ValidatorMethod from './validator-method';

export default interface Validator {
  /**
   * Returns validation status of all validation methods
   * @returns boolean
   */
  isValid(): boolean

  /**
   * Add validators
   */
  addValidators(validators: ValidatorMethod[]): void

  /**
   * Remove validators
   */
  removeValidators(validators: ValidatorMethod[]): void

  /**
   * Set validators
   */
  setValidators(validators: ValidatorMethod[]): void

  /**
   * Retrieves all validators
   * @returns ValidatorMethod[]
   */
  getValidators(): ValidatorMethod[]
}
