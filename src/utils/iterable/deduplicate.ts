/**
 * Removes duplicate objects from an array based on specified key fields.
 *
 * @template T - The type of objects in the array.
 * @param {T[]} arr - The input array of objects to deduplicate.
 * @param {Array<keyof T>} keys - The list of keys used to determine uniqueness.
 * @returns {T[]} A new array with duplicates removed, keeping the first occurrence of each unique combination of keys.
 *
 * @example
 * const data = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice' }
 * ];
 * const unique = dedupeByKeys(data, ['id', 'name']);
 * // unique = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 */
export default <T extends object>(arr: T[], keys: Array<keyof T>) => {
  if (!arr?.length) return [];

  const map = new Map<string, T>();
  const deduped: T[] = [];

  arr.forEach((item) => {
    const key = Array.from({ length: keys.length }).map((_, i) => item[keys[i]]).join('.');
    if (!map.has(key)) {
      deduped.push(item);
      map.set(key, item);
    }
  });

  map.clear();
  return deduped;
}
