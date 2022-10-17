import { Navigate, Outlet } from "react-router-dom";

import { getUserAuthenticated } from "../../utils/handleToken";
import { Navbar } from "../Navbar";

import "../../styles/navbar/navbar.css";

const ProtectedRoutes = () => {
  const isAuthenticated = getUserAuthenticated();

  return isAuthenticated ? (
    <div>
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
