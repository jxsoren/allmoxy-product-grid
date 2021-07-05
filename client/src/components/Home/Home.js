import React, { useContext } from "react";
import { ProductList } from "../Product/ProductList.js";
import { ProductForm } from "../Product/ProductForm.js";


export const Home = (props) => {
  return (
    <div>
      <ProductForm />
      <ProductList />
    </div>
  );
};
