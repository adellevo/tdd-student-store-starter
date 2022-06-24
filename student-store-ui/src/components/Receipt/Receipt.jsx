import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import axios from "axios";
import "./ShoppingCart.css";

export default function Receipt({ isOpen, products, shoppingCart }) {
  return (
    <div className="receipt">
      <div className="receipt-subtotal">
        <span className="label">Subtotal</span>
        <span></span>
        <span></span>
        <span className="subtotal">{calculateSubtotal().toFixed(2)}</span>
      </div>
      <div className="receipt-taxes">
        <span className="label">Taxes and Fees</span>
        <span></span>
        <span></span>
        <span className="taxes-and-fees">{calculateTaxes().toFixed(2)}</span>
      </div>
      <div className="receipt-total">
        <span className="label">Total</span>
        <span></span>
        <span></span>
        <span className="total-price">{calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
}
