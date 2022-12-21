import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import Category from "../../components/Category/Category";
import ProductList from "../../components/ProductList/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../store/categorySlice";
import "./HomePage.scss";
import { motion } from "framer-motion";
import Notification from "../../components/Notification/Notification";


const HomePage = () => {
  const dispatch = useDispatch();
  const { data: categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );
  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );
  useSelector((state) => state.category);
  const { data: current } = useSelector((state) => state.auth);
  useEffect(() => {
   if(current) {dispatch(fetchProducts({ userName: current.userName }));
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(1, "all"));
    dispatch(fetchProductsByCategory(2, "all"));}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      <Slider />
     <Notification/>

      <Category categories={categories} status={categoryStatus} />
      <ProductList products={products} status={productStatus} />
    </motion.div>
  );
};

export default HomePage;
