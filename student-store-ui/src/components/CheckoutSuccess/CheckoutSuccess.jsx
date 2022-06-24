import React from "react";

export default function CheckoutSuccess(props) {
  return (
    <div className="checkout-success">
      <h3>Receipt</h3>
      <p>
        Showing receipt for {props.checkoutForm.name} available at{" "}
        {props.checkoutForm.email}{" "}
      </p>
      <ul>
        {props.shoppingCart.map((product) => (
          <li key={product.itemId}>
            {product.quantity} total {product.name} purchased at a cost of 20
            for a total cost of 20.
          </li>
        ))}
      </ul>
    </div>
  );
}
