import useVerifyToken from "../Hooks/hookAuth/useVerifyToken";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface typeChildren {
  children: ReactNode;
}
const ProtectedRoutes = ({ children }: typeChildren) => {
  const { valid, loading } = useVerifyToken();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }
  if (!valid && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;