import React from "react";

export default function CheckoutForm(props) {
  return (
    <div className="checkout-form">
      <div>
        <h3>Payment Info</h3>
      </div>
      <form>
        <input
          className="checkout-form-input"
          type="text"
          name={props.checkoutForm.name}
          placeholder={"Student Name"}
          value={props.checkoutForm.name}
          onChange={props.handleCheckoutFormChange}
        />
        <input
          className="checkout-form-input"
          type="email"
          name={props.checkoutForm.email}
          placeholder={"student@codepath.org"}
          value={props.checkoutForm.email}
        />
        <button
          className="checkout-button"
          onClick={() => props.handleOnSubmitCheckoutForm({})}
        >
          Checkout
        </button>
      </form>
    </div>
  );
}
