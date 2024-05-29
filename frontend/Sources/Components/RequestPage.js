import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const productsImgSelect = [
  { name: 'All Products', image: '/images/spareparts.jpg', value: 'All Products' },
  { name: 'Mobile', image: '/images/mobile.jpg', value: 'Mobile' },
  { name: 'Laptop', image: '/images/laptop.jpg', value: 'Laptop' },
  { name: 'Tablet', image: '/images/tablet.jpg', value: 'Tablet' },
  { name: 'Desktop', image: '/images/desktop.jpg', value: 'Desktop' },
  { name: 'Electronics', image: '/images/electronies.jpg', value: 'Electronics' },

];


function RequestPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSortOrder, setSelectedSortOrder] = useState('lowToHigh');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/getrequest');
        const getdata = await response.json();
        setProducts(getdata);
      
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const imageUrls = [
    '/images/bg1.jpg',
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
  ];

  const highlightMatchingLetters = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, (match) => `<span class="highlight" style="color: red;">${match}</span>`);
  };

  const handleSortOrderChange = (e) => {
    setSelectedSortOrder(e.target.value);
  };

  // Convert Bengali numbers to English numbers
  const convertBanglaToNumber = (banglaNumber) => {
    const banglaToEnglishNumberMap = {
      '০': '0',
      '১': '1',
      '২': '2',
      '৩': '3',
      '৪': '4',
      '৫': '5',
      '৬': '6',
      '৭': '7',
      '৮': '8',
      '৯': '9',
    };

    const englishNumberString = banglaNumber.replace(/[০-৯]/g, (match) => banglaToEnglishNumberMap[match]);
    return englishNumberString;
  };

  const comparePrices = (a, b) => {
    return a.localeCompare(b, 'bn', { sensitivity: 'base' });
  };

  const filteredProducts = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedProduct === '' || product.ProductName.toLowerCase().includes(selectedProduct.toLowerCase())) &&
    (
      (minPrice === '' || comparePrices(convertBanglaToNumber(minPrice), convertBanglaToNumber(product.Price)) <= 0) &&
      (maxPrice === '' || comparePrices(convertBanglaToNumber(maxPrice), convertBanglaToNumber(product.Price)) >= 0)
    )
  );

  const sortProducts = (a, b) => {
    if (selectedSortOrder === 'lowToHigh') {
      return comparePrices(convertBanglaToNumber(a.Price), convertBanglaToNumber(b.Price));
    } else {
      return comparePrices(convertBanglaToNumber(b.Price), convertBanglaToNumber(a.Price));
    }
  };

  const sortedProducts = [...filteredProducts].sort(sortProducts);

  return (
    <div>
      <div className="home-container">
        {/* <div className="bg-cover bg-center h-80" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + imageUrls[currentImageIndex]})` }}>
          {isLoaded && (
            <> */}
              {/* <center> */}
                {/* Your content here */}
              {/* </center>
            </>
          )}
        </div> */}

        <div className="container mx-auto my-5 ">
          <div className="flex items-center space-x-4">
            {productsImgSelect.map((product) => (
              <div
                key={product.value}
                className={`w-16 h-16 p-1 mx-8 bg-white rounded-full cursor-pointer  hover:scale-150  border-black-600  
                    ${selectedProduct === product.value ? 'border border-green-600' : 'border border-gray-300'}`}
                onClick={() => setSelectedProduct(product.value)}
              >
                <img
                  src={process.env.PUBLIC_URL + product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className='my-2 mx-2'>{product.value}</div>
              </div>

            ))}
          </div>
        </div>
        <div className="container mx-auto my-5">
          <div className="container mx-auto my-5">
            <div className="search-container py-6 flex items-center space-x-2">
              <input
                type="search"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-3/5  h-12 py-3 px-4 border border-gray-300 rounded-md"
              />
              <select
                value={selectedSortOrder}
                onChange={handleSortOrderChange}
                className="w-3/5 h-12  py-3 px-4 border border-gray-300 rounded-md"
              >
                <option value="lowToHigh">Price Low to High</option>
                <option value="highToLow">Price High to Low</option>
              </select>
              <input
                type="text"
                placeholder="Starting Price "
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/5 py-3 px-4 h-12 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Ending Price "
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/5  h-12  py-3 px-4 border border-gray-300 rounded-md"
              />
              <button
                className="w-1/5  my-5 py-3 px-4 border border-gray-300 rounded-md bg-red-500 text-white"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSortOrder('lowToHigh');
                  setMinPrice('');
                  setMaxPrice('');
                }}
              >
                Clear
              </button>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {sortedProducts && sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (

                <div className=" border-black bg-blue-100 rounded-lg overflow-hidden relative hover:scale-110" key={product.PID}>
                  <Link to={`/RequestWelcome/${product.PID}`} className="block h-full">
                    <div className="relative overflow-hidden group">
                      <img
                        src={`/uploads/${product.Image1}`}
                        alt={product.ProductName}
                        className="w-full h-48 object-cover transition-transform transform group-hover:scale-105"
                      />
                      <div className="absolute top-0 left-0 p-2 bg-blue-500 text-white font-semibold rounded-bl">
                        {product.Price}৳
                      </div>
                      <button className="absolute top-0 right-0 p-2 bg-green-600 text-white font-semibold rounded-bl">
                        +
                        <i className="fa-solid fa-shopping-cart fa-xl" style={{ color: 'white' }}></i>
                      </button>
                    </div>
                    <div className="p-4 group-hover:bg-gray-100 ">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.Company} - {product.Model}</h3>
                      <p className="text-sm text-gray-600">RAM: {product.RAM}</p>
                      <p className="text-sm text-gray-600">STORAGE: {product.ROM}</p>
                      {/* <p className="text-sm text-gray-600">Front Camera: {product.FrontCamera}</p>
                      <p className="text-sm text-gray-600">Rear Camera: {product.RearCamera}</p>
                      <p className="text-sm text-gray-600">Battery: {product.Battery}</p>
                      <p className="text-sm text-gray-600">Description: {product.Description}</p>
                      <p className="text-sm text-gray-600">Is Working Properly: {product.IsWorkingProperly}</p>
                      <p className="text-sm text-gray-600">Issues: {product.Issues}</p>
                      <p className="text-sm text-gray-600">Courier Option: {product.CourierOption}</p>
                      <p className="text-sm text-gray-600">Location: {product.Location}</p> */}
                      <p className="text-sm text-gray-600">Phone Number: {product.PhoneNumber}</p>
                      {/* You can add more fields as needed */}
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-xl text-gray-800 py-4">No products found.</p>
            )}
          </div>

        </div>
      </div>
      <footer className="bg-gray-200 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <h5 className="text-2xl font-bold text-gray-800">About Us</h5>
              <ul className="text-gray-600">
                <li>About TradeTrove</li>
                <li>Announcements</li>
                <li>Community</li>
              </ul>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <h5 className="text-2xl font-bold text-gray-800">Help & Contact</h5>
              <ul className="text-gray-600">
                <li>Contact Us</li>
                <li>Help and Contact</li>
                <li>TradeTrove Money Back Guarantee</li>
              </ul>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <h5 className="text-2xl font-bold text-gray-800">Policies</h5>
              <ul className="text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Legal Notices</li>
              </ul>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <h5 className="text-2xl font-bold text-gray-800">TradeTrove Sites</h5>
              <ul className="text-gray-600">
                <li>TradeTrove.com</li>
                <li>TradeTrove More</li>
                <li>TradeTrove Advertising</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RequestPage;
