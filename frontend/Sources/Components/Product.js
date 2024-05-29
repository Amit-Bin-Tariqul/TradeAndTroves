import React from 'react';
import './Product.css';

function Product({ data }) {
  return (
    <div className="product">
      <div className="product-image">
        <img src={data.image} alt={data.name} />
      </div>
      <div className="product-details">
        <h3>{data.name}</h3>
        <p className="description">{data.description}</p>
        <p className="price">{data.price}</p>
      </div>
    </div>
  );
}

export default Product;
