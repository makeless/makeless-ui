export default interface Validator {
  /**
   * Returns validation status
   * @returns boolean
   */
  isValid(): boolean

  /**
   * Sets error
   * @param error - error status
   */
  setError(error: boolean): void
}
