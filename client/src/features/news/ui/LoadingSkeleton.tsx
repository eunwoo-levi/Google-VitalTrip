export function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-gray-300"></div>
      <div className="p-6">
        <div className="flex justify-between mb-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="h-5 bg-gray-300 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}