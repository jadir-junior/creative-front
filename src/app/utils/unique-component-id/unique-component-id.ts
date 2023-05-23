export class UniqueComponentId {
  static lastId = 0;

  public static generateId(): string {
    const prefix = 'pr_id_';
    this.lastId++;
    return `${prefix}${this.lastId}`;
  }
}
