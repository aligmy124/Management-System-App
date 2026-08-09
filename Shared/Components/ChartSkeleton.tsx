export function ChartSkeleton() {
  return (
    <div className="h-[360px] animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 h-5 w-40 rounded bg-gray-200" />
      <div className="h-full rounded-xl bg-gray-100" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 h-5 w-36 rounded bg-gray-200" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-gray-100" />
        ))}
      </div>
    </div>
  );
}