import React from "react";
import "./CheckoutForm.css";

export default function CheckoutForm(props) {
  return (
    <div className="checkout-form">
      <h3 className="payment-header">Payment Info</h3>
      <form>
        <input
          className="checkout-form-input"
          type="email"
          name="email"
          placeholder={"student@codepath.org"}
          value={props.checkoutForm.email}
          onChange={() => props.handleCheckoutFormChange}
        />
        <input
          className="checkout-form-input"
          type="text"
          name="name"
          placeholder={"Student Name"}
          value={props.checkoutForm.name}
          onChange={() => props.handleCheckoutFormChange}
        />
        <button
          className="checkout-button"
          onClick={() => props.handleOnSubmitCheckoutForm}
        >
          Checkout
        </button>
        {props.error !== "" ? (
          <p className="error">{props.error}</p>
        ) : (
          <p className="success">Success!</p>
        )}
      </form>
    </div>
  );
}
