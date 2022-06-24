import React from "react";

export default function Receipt(props) {
  return (
    <div className="receipt">
      <div className="receipt-subtotal">
        <span className="label">Subtotal</span>
        <span></span>
        <span></span>
        <span className="subtotal">{props.calculateSubtotal().toFixed(2)}</span>
      </div>
      <div className="receipt-taxes">
        <span className="label">Taxes and Fees</span>
        <span></span>
        <span></span>
        <span className="taxes-and-fees">
          {props.calculateTaxes().toFixed(2)}
        </span>
      </div>
      <div className="receipt-total">
        <span className="label">Total</span>
        <span></span>
        <span></span>
        <span className="total-price">{props.calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
}
