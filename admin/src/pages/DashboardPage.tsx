import { Suspense } from "react";
import { UserList } from "../components/dashboard/UserList";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-8">
              <div className="text-lg">로딩 중...</div>
            </div>
          }
        >
          <UserList />
        </Suspense>
      </div>
    </div>
  );
}
