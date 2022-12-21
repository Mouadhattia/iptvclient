import React, { useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./CategoryPage.scss";
import { motion } from "framer-motion";
import { fetchProducts } from "../../store/productSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { data: products,  status } = useSelector((state) => state.product);
  const {data:current } =useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts({categoryName:name ,userName:current.userName}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="category-page"
    >
      <div className="container">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home"></i>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </Link>
            </li>
            <li>
            Catégorie
              <span className="breadcrumb-separator">
                <i className="fas fa-chevron-right"></i>
              </span>
            </li>
            <li>{name}</li>
          </ul>
        </div>
      </div>
      <ProductList products={products} status={status} />
    </motion.div>
  );
};

export default CategoryPage;
