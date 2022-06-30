import React from "react";

export default function CheckoutSuccess({
  receipt,
  isCheckedOut,
}) {
  return (
    <div className="checkout-success">
      <h3>Checkout Info</h3>
      {isCheckedOut ? (
        receipt && (
          <>
            <h4>Receipt</h4>
            {receipt.userInfo && (
              <p>
                Showing receipt for {receipt.userInfo.name} available at{" "}
                {receipt.userInfo.email}{" "}
              </p>
            )}
            {receipt.lines && receipt.lines.map((line) => <li>{line}</li>)}
          </>
        )
      ) : (
        <p>
          A confirmation email will be sent to you so that you can confirm this
          order. Once you have confirmed the order, it will be delivered to your
          dorm room.
        </p>
      )}
    </div>
  );
}
