export class ObjectUtils {
  public static isDate(input: Date): boolean {
    return Object.prototype.toString.call(input) === '[object Date]';
  }

  public static isEmpty(
    value: null | undefined | '' | Array<any> | Object | Date
  ): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (!this.isDate(value as Date) &&
        typeof value === 'object' &&
        Object.keys(value).length === 0)
    );
  }
}
