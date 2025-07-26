/**
 * Groups objects from an array into a Map based on a composite key built from specified object fields.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} arr - The array of objects to group.
 * @param {Array<keyof T>} keys - The list of keys used to compute the grouping key.
 * @returns {Map<string, T[]>} A Map where each key is a string built from the specified fields,
 * and the value is an array of objects that share that composite key.
 *
 * @example
 * const data = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' }
 * ];
 * const grouped = groupByKeys(data, ['id', 'name']);
 * // grouped will be:
 * // Map {
 * //   '1.Alice' => [{ id: 1, name: 'Alice' }, { id: 1, name: 'Alice' }],
 * //   '2.Bob'   => [{ id: 2, name: 'Bob' }]
 * // }
 */
export default <T extends object>(arr: T[], keys: Array<keyof T>): Map<string, T[]> => {
  if (!arr?.length) return new Map();

  const map: Map<string, T[]> = new Map();

  arr.forEach((item) => {
    const key = Array.from({ length: keys.length }).map((_, i) => item[keys[i]]).join('.');
    if (!map.has(key)) {
      map.set(key, [item]);
    } else {
      const val = map.get(key);
      val?.push(item);
    }
  });

  return map;
};
