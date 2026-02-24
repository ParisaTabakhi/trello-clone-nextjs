/**
 * Pure utility to reorder items in an array
 * @param list original array
 * @param startIndex item current index
 * @param endIndex item new index
 * @returns new reordered array (immutable)
 */
export function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/**
 * Move item from one array to another
 * @param source original array
 * @param destination target array
 * @param sourceIndex index in source array
 * @param destinationIndex index in destination array
 * @returns {source: T[], destination: T[]} new arrays (immutable)
 */
export function moveItemBetweenArrays<T>(
  source: T[],
  destination: T[],
  sourceIndex: number,
  destinationIndex: number
): { source: T[]; destination: T[] } {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destinationIndex, 0, removed);
  return { source: sourceClone, destination: destClone };
}