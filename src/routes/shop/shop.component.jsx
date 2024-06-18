import { UserContext } from "../../contexts/user.context";
import { Fragment, useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'

import { CategoriesContext } from "../../contexts/categories.context";

import Category from "../category/category.component";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
  return (
  <Routes>
    <Route index element={<CategoriesPreview />} />
    <Route path=':category' element={<Category />} />
  </Routes>
  
  )

}

export default Shop;