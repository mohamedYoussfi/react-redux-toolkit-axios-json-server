import React from "react";

function ProductItem(props) {
  let product = props.product;
  const dispatch = props.dispatch;
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <button
          onClick={() => dispatch({ type: "handleCheck", payload: product })}
          className="btn btn-outline-success"
        >
          <i
            className={product.checked ? "bi bi-check2-circle" : "bi bi-app"}
          ></i>
        </button>
      </td>
      <td>
        <button
          onClick={() => dispatch({ type: "handleDelete", payload: product })}
          className="btn btn-danger"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
