import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Loading from "../pages/shared/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  // console.log(location);
  if (loading) {
    return <Loading />;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/signin"}></Navigate>;
};

export default PrivateRoute;
