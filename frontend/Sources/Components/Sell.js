import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const productsImgSelect = [
  { name: 'Mobile', image: '/images/mobile.jpg', value: 'Mobile' },
  { name: 'Laptop', image: '/images/laptop.jpg', value: 'Laptop' },
  { name: 'Tablet', image: '/images/accessories.png', value: 'Tablet' },
  { name: 'Electronics', image: '/images/electronies.jpg', value: 'Electronics' },
  { name: 'Desktop', image: '/images/desktop.jpg', value: 'Desktop' },
];

const imageUrls = [
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/bg3.jpg',
  '/images/bg4.jpg',
];

function Sell() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const delayToShowElements = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    const imageTransitionInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearTimeout(delayToShowElements);
      clearInterval(imageTransitionInterval);
    };
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Select a Product to Sell</h1>
      <div className="flex items-center space-x-8 my-10 justify-center">
        {productsImgSelect.map((product) => (
          <Link to={`/${product.value}`} key={product.value}>
            <div
              className={`w-32 h-32 p-4 bg-white rounded-full cursor-pointer transform hover:scale-110 hover:shadow-md
                ${selectedProduct === product.value ? 'border border-green-600' : 'border border-gray-300'}`}
              onClick={() => setSelectedProduct(product.value)}
            >
              <img
                src={process.env.PUBLIC_URL + product.image}
                alt={product.name}
                className="w-24 h-24 rounded-full mx-auto"
              />
            </div>
            <p className="text-center mt-2 text-gray-800">{product.name}</p>
          </Link>
        ))}
      </div>
      <div className="bg-cover bg-center h-64 sm:h-80" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + imageUrls[currentImageIndex]})` }}>
        {isLoaded && (
          <>
            <center>
              {/* Additional content */}
            </center>
          </>
        )}
      </div>
    </div>
  );
}

export default Sell;
