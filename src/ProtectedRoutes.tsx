import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";

const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!isLoading && !user && !hasShownToast) {
      toast.success("Please log in to access this page");
      setHasShownToast(true);
    }
  }, [user, isLoading, hasShownToast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  console.log("user...", user);

  return <Outlet />;
};

export default ProtectedRoutes;