
import { Navigate, Outlet } from "react-router-dom";



export  const ProtectedRoute = ({ redirectPath = '/login' }) => {

let user=localStorage.getItem("token")
let role=localStorage.getItem("role")
 if(!role ||!user){
  
  return <Navigate to={redirectPath} replace />;
  }
 

  return <Outlet />;
};