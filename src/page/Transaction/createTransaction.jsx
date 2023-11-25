import React, { useState } from "react";
import ProductList from "./ProductList";
import Transaction from "../Transaction";

export default function () {
  const [cartItems, setCartItems] = useState([]);

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };

  const handleAddToCart = (product) => {
    if (!isProductInCart(product._id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <div className="container mx-auto my-8 p-8 max-w-screen-xl rounded-lg shadow-2xl bg-white">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Create Transaction
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-flow-rows">
            <ProductList
              onAddToCart={handleAddToCart}
              isProductInCart={isProductInCart}
            />
          </div>
          <div className="grid h-screen items-center justify-center">
            <Transaction
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
            />
          </div>
        </div>
      </div>
    </>
  );
}
