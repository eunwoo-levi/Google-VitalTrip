import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAdminCheckQuery } from "src/api/login/useAdminCheckQuery";

export const ProtectedRoute = () => {
  const { data: isAdmin, isLoading } = useAdminCheckQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      alert("Admin 로그인을 해주세요.");
      navigate("/login");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return <Outlet />;
};
