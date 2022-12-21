import { Navigate, Outlet } from "react-router-dom";




export  const AuthRoute = ({ user, redirectPath = '/' }) => {
  if (user) {
    
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};