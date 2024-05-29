
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductBuy.css";

const ProductBuy = () => {
  const location = useLocation();
  
  const product = location.state;
  console.log(location.state);
  const [quantity, setQuantity] = useState(location.state.amount); // Initial quantity is 0
  const maxQuantity = product.Quantity;
  const [cost, setCost] = useState(
    location.state.amount * location.state.price
  );
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePay = () => {
    const dataToSend = {
      ...formData,
      prouctId: product.productId,
      Quantity: quantity, // Include the productId
    };
    console.log(product.prouctId);
    console.log("Form Data:", formData);
    fetch("/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
       window.location.replace(result.url);
        
      
      });
  };

  return (
    <center>
      <h3>Buy your Product</h3>
      <div className="product-buy-container">
        <img
          src={product.image}
          alt={product.productName}
          className="product-imagee"
        />
        <div className="product-details">
          <p>Id: {product.productId}</p>
          <p>Product Name: {product.productName}</p>
          <p>Price: {location.state.price}৳</p>
          <p>Quantity: {product.quantity}</p>
        </div>
        <div className="form-container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />

          <div className="quantity-container">
            {/* <button className="quantity-btn" onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-btn" onClick={() => setQuantity(quantity < maxQuantity ? quantity + 1 : quantity)}>
              +
            </button> */}
          </div>
          <div className="cost-container">
            <br></br>
            <p>Cost: Tk {cost.toFixed(2)}</p>
          </div>
          <button onClick={handlePay}>Pay Now</button>
          <div className="warning">
            N:B: The product money is refundable only if you cancel within 1
            hour !!
          </div>
        </div>
      </div>
    </center>
  );
};

export default ProductBuy;



