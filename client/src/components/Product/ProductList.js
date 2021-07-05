import React, { useContext, useEffect } from "react";
import { Product } from "./Product.js";
import { ProductContext } from "../../provider/ProductProvider.js";

export const ProductList = (props) => {
  const { userProducts, getUserProducts, sorter } = useContext(ProductContext);

  useEffect(() => {
    getUserProducts();
}, []);
const sortedProducts = userProducts.userProducts.sort((a, b) => {
  if (sorter.value === "-") {
    return userProducts.userProducts;
  }
  if (sorter.value === "A_Z") {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    }
    return 0;
  }
  if (sorter.value === "Z_A") {
    if (b.title < a.title) {
      return -1;
    } else if (b.title > a.title) {
      return 1;
    }
    return 0;
  }
  if (sorter.value === "$_$$$") {
    return a.price - b.price;
  }
  if (sorter.value === "$$$_$") {
    return b.price - a.price;
  }
});

  return (
    <div className="recipes">
      {sortedProducts.map((product) => {
        return <Product {...product} type="public" key={product._id} />;
      })}
    </div>
  );
};
