import { Outlet, useNavigate } from "react-router";
import { httpClient } from "src/utils/httpClient";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await httpClient.post("/auth/admin/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              VitalTrip Admin Page
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
