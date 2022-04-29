/**
 * Function for sorting array of objects by some key
 * @example
 * var userList = [
 *  {
 *    firstName: 'John',
 *    lastName: 'Doe',
 *  },
 *  {
 *    firstName: 'K',
 *    lastName: 'Smith',
 *  },
 * ]
 * var userListSortedByLastName = SortArrayObjectHelper<User>(userList, 'lastName');
 * @param array
 * @param sortBy
 * @constructor
 */
export function sortArrayObjectHelper<T>(array: T[] = [], sortBy: keyof T): T[] {
  return array.sort((a: T, b: T): number => {
    const first = String(a[sortBy]).toUpperCase() ?? '';
    const second = String(b[sortBy]).toUpperCase() ?? '';

    if (first < second) {
      return -1;
    }

    if (first > second) {
      return 1;
    }

    return 0;
  });
}
