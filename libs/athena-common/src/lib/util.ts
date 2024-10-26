export const logObject = (item: any, label?: string) => {
  if (label) {
    console.log(label, JSON.stringify(item, null, 4));
  } else {
    console.log(JSON.stringify(item, null, 4));
  }
};

export function range(x: number): number[] {
  return Array.from({ length: x + 1 }, (_, i) => i);
}
