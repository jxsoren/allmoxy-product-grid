import React, { useState } from "react";
import axios from "axios";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  const [userProducts, setUserProducts] = useState({
    userProducts: [],
  });
  const [sorter, setSorter] = useState("");
  console.log(userProducts);

  const getUserProducts = () => {
    axios.get("/api/products").then((res) => {
      setUserProducts(
        (prev) => ({
          ...prev,
          userProducts: res.data,
        }),
        console.log(userProducts)
      );
    });
  };

  const addProduct = (newProduct) => {
    axios
      .post("/api/products", newProduct)
      .then((res) => {
        setUserProducts((prev) => ({
          ...prev,
          userProducts: [...prev.userProducts, res.data],
        }));
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (productID) => {
    axios.delete(`api/products/${productID}`).then((res) => {
      setUserProducts((prev) => ({
        ...prev,
        userProducts: prev.userProducts.filter(
          (product) => product._id !== productID
        ),
      }));
    });
  };

  const editProduct = (updates, productID) => {
    axios
      .put(`/api/products/${productID}`, updates)
      .then((res) => {
        setUserProducts((prev) => ({
          ...prev,
          userProducts: prev.userProducts.map((product) =>
            product._id !== productID ? product : res.data
          ),
        }));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (e) => {
    setSorter({
      value: e.target.value,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        userProducts,
        addProduct,
        deleteProduct,
        editProduct,
        getUserProducts,
        sorter,
        handleSelect
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
