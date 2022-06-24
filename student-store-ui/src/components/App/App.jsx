import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import axios from "axios";
import "./App.css";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Search from "../Search/Search";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [checkoutForm, setCheckoutForm] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [category, setCategory] = useState("");

  const findQuantity = (productId) => {
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].itemId == productId) {
        return shoppingCart[i].quantity;
      }
    }
    return 0;
  };

  const handleOnCheckoutFormChange = (name, value) => {
    if (name == "name") {
      setCheckoutForm({ name: name, email: value });
    } else if (name == "email") {
      setCheckoutForm({ name: name, email: value });
    }
  };

  const handleAddItemToCart = (productId) => {
    const inCart = shoppingCart.some((item) => {
      return item.itemId === productId;
    });
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
    // console.log(shoppingCart);
  };

  const handleRemoveItemToCart = (productId) => {
    const inCart = shoppingCart.some((item) => {
      return item.itemId === productId;
    });
    const newShoppingCart = [...shoppingCart];
    const index = newShoppingCart.findIndex((item) => item.itemId == productId);

    // only remove when it's already in the cart
    if (inCart && shoppingCart.length != 0) {
      newShoppingCart[index].quantity == 0
        ? delete newShoppingCart[index]
        : (newShoppingCart[index] = {
            itemId: productId,
            quantity: shoppingCart[index].quantity - 1,
          });
      setShoppingCart(newShoppingCart);
      // console.log(shoppingCart);
    }
  };

  // ---- initial load ----

  useEffect(async () => {
    try {
      const response = await axios.get(
        "https://codepath-store-api.herokuapp.com/store"
      );
      setProducts(response.data.products);
      setIsFetching(true);
    } catch (err) {
      setError(err);
    }
  }, []);

  const handleOnSubmitCheckoutForm = () => {
    axios
      .post("https://codepath-store-api.herokuapp.com/store", {
        user: {
          name: checkoutForm.name,
          email: checkoutForm.email,
        },
        shoppingCart: {
          orders: shoppingCart,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        setError(err);
      });
  };

  useEffect(async () => {
    try {
      const response = await axios.get(
        "https://codepath-store-api.herokuapp.com/store"
      );
      //
      setProducts(response.data.products);
      setIsFetching(true);
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar />
          <Sidebar
            isOpen={isOpen}
            shoppingCart={shoppingCart}
            products={products}
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange}
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
            findQuantity={findQuantity}
            handleOnToggle={() => setIsOpen(!isOpen)}
          />
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
                <ProductDetail
                  shoppingCart={shoppingCart}
                  products={products}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemToCart={handleRemoveItemToCart}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
