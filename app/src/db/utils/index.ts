export function findOne<T>(results: T[]): T | null {
  return results[0] ?? null;
}
export function findOneOrThrow<T>(results: T[]): T {
  const result = findOne(results);
  if (!result) {
    throw new Error("Not found");
  }
  return result;
}
