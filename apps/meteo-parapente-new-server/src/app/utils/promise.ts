type SourceResult<T> = {
  id: string;
  status: "fulfilled" | "rejected";
  value?: T;
  reason?: unknown;
};

export async function allSettledWithIds<T>(
  sources: { id: string; promise: Promise<T> }[]
): Promise<SourceResult<T>[]> {
  const results = await Promise.allSettled(
    sources.map(({ promise }) => promise)
  );

  return results.map((result, i) => ({
    id: sources[i].id,
    ...result,
  }));
}
