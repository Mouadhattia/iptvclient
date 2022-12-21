import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthRoute } from "./AuthRoute";
import { Home, Category, Cart,Login } from "../pages/index";
import { AnimatePresence } from "framer-motion";


const AnimatedRoutes = ({ user,x}) => {
  const location = useLocation();


 
 
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<Home />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route element={<AuthRoute user={user} />}>
        <Route path="/login" element={<Login />} />
      </Route>
      
    </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
