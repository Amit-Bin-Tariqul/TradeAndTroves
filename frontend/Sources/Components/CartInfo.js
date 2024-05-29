


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CartInfo() {
  const [cartItems, setCartItems] = useState([]);
  const getEmail = localStorage.getItem("emailData");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/getcart", {
          params: { email: getEmail },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const removeFromCart = async (pid, quantity) => {
    try {
      const response = await axios.delete(`/removeFromCart/${pid}/${quantity}`);
      if (response.status === 200) {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.pid !== pid)
        );
      }
    } catch (error) {
      console.error("Error removing product from the cart:", error);
    }
  };

  const totalCartPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.totalprice,
    0
  );

  return (
    <div className="container mx-auto my-5">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <div
              key={cartItem.pid}
              className="bg-white border rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={cartItem.image}
                  alt={cartItem.image}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white font-semibold rounded-bl">
                  ${cartItem.unitprice}
                </div>
              </div>
              <div className="p-4">
              <p className="text-base mb-2">
                  {cartItem.pid}
                </p>
                <p className="text-base mb-2">
                  Unit Price: {cartItem.unitprice}৳
                </p>
                <p className="text-base mb-2">
                  Quantity: {cartItem.totalprice / cartItem.unitprice}
                </p>
                <p className="text-base mb-2">Price: {cartItem.totalprice}৳</p>
                <button
                  onClick={() =>
                    removeFromCart(
                      cartItem.pid,
                      cartItem.totalprice / cartItem.unitprice
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-matching-products text-xl font-semibold text-center">
            No items in the cart.
          </p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="text-2xl font-semibold mt-4">
          Total Price: {totalCartPrice}৳
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-center justify-center mt-4">
          <button
            onClick={() => {
              // Handle the "Buy All" action here
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded  block text-center"
          >
            Buy All
          </button>
        </div>
      )}
    </div>
  );
}

export default CartInfo;
