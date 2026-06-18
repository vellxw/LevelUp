export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite" className="mx-auto max-w-shell px-4 py-4 sm:px-6 lg:px-10">
      <div className="grid gap-4 lg:grid-cols-[65%_35%]">
        <div className="relative h-[420px] overflow-hidden rounded-md border border-line bg-surface1 lg:h-[640px]">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface2/40 to-surface1/60" />
          <div className="absolute bottom-10 left-10 right-10 space-y-3">
            <div className="h-3 w-24 rounded-xs bg-surface3" />
            <div className="h-12 w-3/4 rounded-xs bg-surface3" />
            <div className="h-12 w-1/2 rounded-xs bg-surface3" />
            <div className="h-4 w-2/3 rounded-xs bg-surface2" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-[88px_1fr] items-center gap-4 border-b border-line py-3 first:pt-0">
              <div className="h-16 w-22 animate-pulse rounded-sm bg-surface2 sm:h-20" />
              <div className="space-y-2">
                <div className="h-3 w-1/3 animate-pulse rounded-xs bg-surface2" />
                <div className="h-3 w-full animate-pulse rounded-xs bg-surface2" />
                <div className="h-3 w-2/3 animate-pulse rounded-xs bg-surface2" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 space-y-8">
        {[0, 1, 2].map((s) => (
          <div key={s} className="space-y-4">
            <div className="h-4 w-32 animate-pulse rounded-xs bg-surface2" />
            <div className="h-8 w-1/3 animate-pulse rounded-xs bg-surface3" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((c) => (
                <div key={c} className="overflow-hidden rounded-md border border-line bg-surface1">
                  <div className="h-40 animate-pulse bg-surface2" />
                  <div className="space-y-2 p-4">
                    <div className="h-3 w-1/4 animate-pulse rounded-xs bg-surface2" />
                    <div className="h-4 w-full animate-pulse rounded-xs bg-surface3" />
                    <div className="h-4 w-2/3 animate-pulse rounded-xs bg-surface2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
