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
export function SortArrayObjectHelper<T>(
  array: T[] = [],
  sortBy: string = 'id',
): T[] {
  return array.sort((
    item1: Record<string, any>,
    item2: Record<string, any>,
  ): number => {
    const first = item1?.[sortBy]?.toUpperCase() ?? '';
    const second = item2?.[sortBy]?.toUpperCase() ?? '';

    if (first < second) {
      return -1;
    }

    if (first > second) {
      return 1;
    }

    return 0;
  });
}