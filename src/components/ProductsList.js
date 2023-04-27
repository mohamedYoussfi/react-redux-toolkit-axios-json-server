import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAllProducts,
  deleteCheckedProducts,
  getProducts,
} from "../redux/redux";

function ProductsList(props) {
  const [checkStatus, setCheckStatus] = useState(false);
  const productState = useSelector((store) => store.productState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <pre>{productState.pending ? "pending" : ""}</pre>
      <pre>{productState.success ? "success" : ""}</pre>
      <pre>
        {productState.errorMessage
          ? JSON.stringify(productState.errorMessage)
          : ""}
      </pre>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>
              <button
                onClick={() => {
                  setCheckStatus(!checkStatus);
                  dispatch(checkAllProducts(!checkStatus));
                  /*
                  dispatch({
                    type: "products/checkAllProducts",
                    payload: !checkStatus,
                  });
                  */
                }}
                className="btn btn-outline-danger"
              >
                <i
                  className={checkStatus ? "bi bi-check2-circle" : "bi bi-app"}
                ></i>
                <span className="m-1">
                  {productState.products
                    ? productState.products.filter((p) => p.checked).length
                    : 0}
                </span>
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  dispatch(deleteCheckedProducts());
                  /*
                  dispatch({
                    type: "products/deleteCheckedProducts",
                    payload: {},
                  });
                  */
                }}
                className="btn btn-outline-danger"
              >
                <i className={"bi bi-trash"}></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {productState.products.map((p) => (
            <ProductItem key={p.id} product={p}></ProductItem>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductsList;
