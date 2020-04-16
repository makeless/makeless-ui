export default class LocalStorage {
  private readonly storage = localStorage;

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }
}
