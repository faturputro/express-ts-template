/**
 * Splits an array into smaller chunks of a specified size.
 *
 * @template T - The type of elements in the input array.
 * @param {T[]} arr - The input array to be chunked.
 * @param {number} [size=1] - The desired chunk size (must be a positive integer).
 * @returns {T[][]} A new array containing sub-arrays (chunks) of the specified size.
 *                  The last chunk may be smaller if the array can't be divided evenly.
 *
 * @example
 * const result = chunkArray([1, 2, 3, 4, 5], 2);
 * // result = [[1, 2], [3, 4], [5]]
 */
export default <T>(arr: T[], size = 1) => {
  if (!arr?.length) return [];

  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
