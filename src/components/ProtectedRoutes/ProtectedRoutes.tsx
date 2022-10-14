import { Navigate, Outlet } from "react-router-dom";

import { getUserAuthenticated } from "../../utils/handleToken";

const ProtectedRoutes = () => {
  const isAuthenticated = getUserAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
