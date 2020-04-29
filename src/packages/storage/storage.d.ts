export default interface Storage {
  /**
   * Retrieves storage item
   * @param key - item identifier
   * @returns string | null
   */
  getItem(key: string): string | null

  /**
   * Sets storage item
   * @param key - item identifier
   * @param value - item value
   */
  setItem(key: string, value: string): void

  /**
   * Removes storage item completely
   * @param key - item identifier
   */
  removeItem(key: string): void
}
