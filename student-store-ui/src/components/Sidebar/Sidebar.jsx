import * as React from "react";
import "./Sidebar.css";
import sidebarIcon from "./shopping-cart.svg";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CheckoutSuccess from "../CheckoutSuccess/CheckoutSuccess";

export default function Sidebar({
  error,
  isOpen,
  shoppingCart,
  products,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
  handleOnToggle,
  isCheckedOut,
}) {
  const getProductName = (productId) => {
    return products.find((product) => product.id == productId).name;
  };

  const getProductPrice = (productId) => {
    return products.find((product) => product.id == productId).price;
  };

  const calculateCost = (quantity, productId) => {
    const newCost = quantity * getProductPrice(productId);
    return newCost;
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
      subtotal += calculateCost(
        shoppingCart[i].quantity,
        shoppingCart[i].itemId
      );
    }
    return subtotal;
  };

  const calculateTaxes = () => {
    return 0.1 * calculateSubtotal();
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxes();
  };

  return (
    <section className="sidebar">
      <button className="toggle-button" onClick={handleOnToggle}>
        <img src={sidebarIcon} />
      </button>
      {isOpen && (
        <>
          <ShoppingCart
            isOpen={isOpen}
            products={products}
            shoppingCart={shoppingCart}
            getProductName={getProductName}
            getProductPrice={getProductPrice}
            calculateCost={calculateCost}
            calculateSubtotal={calculateSubtotal}
            calculateTaxes={calculateTaxes}
            calculateTotal={calculateTotal}
          />
          <CheckoutForm
            error={error}
            isOpen={isOpen}
            shoppingCart={shoppingCart}
            checkoutForm={checkoutForm}
            handleCheckoutFormChange={handleOnCheckoutFormChange}
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
          />
          <CheckoutSuccess
            shoppingCart={shoppingCart}
            checkoutForm={checkoutForm}
            getProductName={getProductName}
            getProductPrice={getProductPrice}
            calculateCost={calculateCost}
            calculateSubtotal={calculateSubtotal}
            calculateTaxes={calculateTaxes}
            calculateTotal={calculateTotal}
            isCheckedOut={isCheckedOut}
          />
        </>
      )}
    </section>
  );
}
