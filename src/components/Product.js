import React, { useEffect, useReducer, useState } from "react";
import NewProduct from "./NewProduct";
import ProductsList from "./ProductsList";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProducts, loadProducts } from "../redux/redux";

function Product() {
  const dispatch = useDispatch();
  /*
  axios.get("http://localhost:9000/products").then((data) => {
    dispatch(loadProducts(data.data));
  });
  */
  //dispatch(loadProducts([{ id: 1, name: "Computer" }]));
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <NewProduct />
      <ProductsList />
    </>
  );
}

export default Product;
