export const SkeletonRow = () => (
  <div className="flex flex-col gap-3">
    <div className="h-3 bg-gray-300 rounded-full w-48 md:w-96" />
    <div className="h-3 bg-gray-300 rounded-full w-32 md:w-72" />
    <div className="h-3 bg-gray-300 rounded-full w-12 md:w-48" />
    <div className="h-3 bg-gray-300 rounded-full w-48 md:w-96" />
  </div>
);

export const SkeletonLoader = () => (
  <div className="animate-pulse flex flex-col gap-8">
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </div>
);
