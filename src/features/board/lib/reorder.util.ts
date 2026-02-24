/**
 * Reorder items in an array immutably
 * @param list original array
 * @param startIndex current index
 * @param endIndex new index
 * @returns new array with item reordered
 */
export function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/**
 * Move an item from one array to another immutably
 * @param source source array
 * @param destination destination array
 * @param sourceIndex index in source array
 * @param destinationIndex index in destination array
 * @returns object containing new source and destination arrays
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