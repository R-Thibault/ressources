export function timestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}
