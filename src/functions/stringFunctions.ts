export function toCamelCase(str: string): string {
  let firstChar = str.charAt(0);
  firstChar = firstChar.toUpperCase();
  return `${firstChar}${str.slice(1).toLowerCase()}`;
}
