import React from "react";

export default function CheckoutSuccess(props) {
  return (
    <div className="checkout-success">
      <h3>Checkout Info</h3>
      <h4>Receipt</h4>

      <p>
        Showing receipt for {props.checkoutForm.name} available at{" "}
        {props.checkoutForm.email}{" "}
      </p>
      <ul>
        {props.shoppingCart.map((product) => (
          <li key={product.itemId}>
            {product.quantity} total {props.getProductName(product.itemId)}{" "}
            purchased at a cost of {props.getProductPrice(product.itemId)} for a
            total cost of{" "}
            {props.calculateCost(product.quantity, product.itemId)}.
          </li>
        ))}
        <li>Before taxes, the subtotal was {props.calculateSubtotal()}</li>
        <li>
          After taxes and fees were applied, the total comes out to{" "}
          {props.calculateTotal()}
        </li>
      </ul>

      {/* {props.isCheckedOut ? (
        <div>
          <p>
            Showing receipt for {props.checkoutForm.name} available at{" "}
            {props.checkoutForm.email}{" "}
          </p>
          <ul>
            {props.shoppingCart.map((product) => (
              <li key={product.itemId}>
                {product.quantity} total {props.getProductName(product.itemId)}{" "}
                purchased at a cost of {props.getProductPrice(product.itemId)}{" "}
                for a total cost of{" "}
                {props.calculateCost(product.quantity, product.itemId)}.
              </li>
            ))}
            <li>Before taxes, the subtotal was {props.calculateSubtotal()}</li>
            <li>
              After taxes and fees were applied, the total comes out to{" "}
              {props.calculateTotal()}
            </li>
          </ul>
        </div>
      ) : (
        <p>
          A confirmation email will be sent to you so that you can confirm this
          order. Once you have confirmed the order, it will be delivered to your
          dorm room.
        </p>
      )} */}
    </div>
  );
}
