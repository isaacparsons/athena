export function mapToArray<T = any>(map: Map<any, T>) {
  return Array.from(map, ([name, value]) => value);
}

export function addArrayItemsToMap<T extends { id: number }>(
  items: T[],
  map: Map<any, any>
) {
  const newMap = new Map(map);
  items.forEach((item) => {
    newMap.set(item.id, item);
  });
  return newMap;
}
