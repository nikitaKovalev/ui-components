/**
 * Function for creation full string for some Entities
 * @example <caption>User Full Name</caption>
 * const user = {
 *    firstName: 'John',
 *    lastName: 'Doe',
 * }
 * const userFullName = FullStringHelper([user.firstName, user.lastName]);
 * @array
 * @separator
 */
type FullStringType = string | number;

export function fullStringHelper(
  array: FullStringType[] = [],
  separator: string = ' ',
): string {
  return array.filter(Boolean).join(separator);
}
