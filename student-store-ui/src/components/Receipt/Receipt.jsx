import React from "react";
import "./Receipt.css";

export default function Receipt(props) {
  return (
    <div className="receipt">
      <div className="receipt-subtotal">
        <p className="label">Subtotal</p>
        <p className="spacer"></p>
        <p className="subtotal">${props.calculateSubtotal()?.toFixed(2)}</p>
      </div>
      <div className="receipt-taxes">
        <p className="label">Taxes and Fees</p>
        <p className="spacer"></p>
        <p className="taxes-and-fees">${props.calculateTaxes()?.toFixed(2)}</p>
      </div>
      <div className="receipt-total">
        <p className="label">Total</p>
        <p className="spacer"></p>
        <p className="total-price">${props.calculateTotal()?.toFixed(2)}</p>
      </div>
    </div>
  );
}
