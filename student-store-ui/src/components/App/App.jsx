import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [checkoutForm, setCheckoutForm] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [category, setCategory] = useState("");
  const [isCheckedOut, setCheckedOut] = useState(false);
  const [receipt, setReceipt] = useState({});

  // ---- initial load ----

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:3001/store");
      setProducts(response.data.products);
      setIsFetching(true);
    } catch (err) {
      setError(err);
      // console.log(error);
    }
  }, []);

  const findQuantity = (productId) => {
    if (shoppingCart.length > 0) {
      for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].itemId == productId) {
          return shoppingCart[i].quantity;
        }
      }
    }
    return 0;
  };

  const handleOnToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAddItemToCart = (productId) => {
    const inCart = shoppingCart.some((item) => item.itemId === productId);
    const newShoppingCart = [...shoppingCart];

    if (!inCart) {
      newShoppingCart.push({ itemId: productId, quantity: 1 });
    } else {
      const index = newShoppingCart.findIndex(
        (item) => item.itemId == productId
      );
      newShoppingCart[index] = {
        itemId: productId,
        quantity: shoppingCart[index].quantity + 1,
      };
    }

    setShoppingCart(newShoppingCart);
  };

  const handleRemoveItemToCart = (productId) => {
    if (shoppingCart.length == 0) {
      return;
    }

    const inCart = shoppingCart.some((item) => item.itemId === productId);
    let newShoppingCart = [...shoppingCart];
    const index = newShoppingCart.findIndex((item) => item.itemId == productId);

    // only remove when it's already in the cart
    if (inCart) {
      if (newShoppingCart[index].quantity == 1) {
        newShoppingCart = [
          ...newShoppingCart.slice(0, index - 1),
          ...newShoppingCart.slice(index + 1),
        ];
      } else {
        newShoppingCart[index] = {
          itemId: productId,
          quantity: shoppingCart[index].quantity - 1,
        };
      }
      setShoppingCart(newShoppingCart);
    }
  };

  const handleOnCheckoutFormChange = (name, value) => {
    if (name == "name") {
      setCheckoutForm({ ...checkoutForm, name: value });
    } else if (name == "email") {
      setCheckoutForm({ ...checkoutForm, email: value });
    }
    // console.log(checkoutForm);
  };

  const handleOnSubmitCheckoutForm = (event) => {
    event.preventDefault();
    // console.log(checkoutForm);
    // handleOnCheckoutFormChange(checkoutForm.name, checkoutForm.email);
    axios
      .post("http://localhost:3001/store", {
        user: {
          name: checkoutForm.name,
          email: checkoutForm.email,
        },
        shoppingCart: shoppingCart,
      })
      .then((response) => {
        // console.log("hiiii: ", response.data.purchase.receipt);
        // setPurchase(response.purchase);
        // response.receipt
        // console.log(response.data.purchase.receipt)
        setReceipt(response.data.purchase.receipt);
        // console.log(receipt);
        setCheckedOut(true);
        // setShoppingCart([]);
        // setCheckoutForm({});
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      });

    // setCheckedOut(true);
    setShoppingCart([]);
    setCheckoutForm({});
  };

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <div className="left-container">
            {console.log(receipt)}
            <Sidebar
              error={error}
              isOpen={isOpen}
              shoppingCart={shoppingCart}
              products={products}
              checkoutForm={checkoutForm}
              handleOnCheckoutFormChange={handleOnCheckoutFormChange}
              handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
              findQuantity={findQuantity}
              handleOnToggle={handleOnToggle}
              isCheckedOut={isCheckedOut}
              setCheckedOut={setCheckedOut}
              receipt={receipt}
              // purchase={purchase}
            />
          </div>
          <div className="right-container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    products={products}
                    handleAddItemToCart={handleAddItemToCart}
                    handleRemoveItemToCart={handleRemoveItemToCart}
                    shoppingCart={shoppingCart}
                    findQuantity={findQuantity}
                    setProducts={setProducts}
                    setCategory={setCategory}
                    category={category}
                  />
                }
              />
              <Route
                path="/products/:productId"
                element={
                  <div>
                    <ProductDetail
                      shoppingCart={shoppingCart}
                      products={products}
                      handleAddItemToCart={handleAddItemToCart}
                      handleRemoveItemToCart={handleRemoveItemToCart}
                    />
                  </div>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}
