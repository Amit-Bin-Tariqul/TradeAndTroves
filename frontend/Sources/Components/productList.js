import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sellerFilter, setSellerFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [productNameFilter, setProductNameFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/getproducts');
        const getData = await response.json();
        setProducts(getData);
        setFilteredProducts(getData); // Initialize filteredProducts with all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = () => {
    let filteredList = [...products];

    // Filter by seller
    if (sellerFilter) {
      filteredList = filteredList.filter(product => product.SellerEmail.toLowerCase().includes(sellerFilter.toLowerCase()));
    }

    // Filter by date
    if (dateFilter) {
      filteredList = filteredList.filter(product => product.date.includes(dateFilter));
    }

    // Filter by location (assuming the location property exists in your product data)
    if (locationFilter) {
      filteredList = filteredList.filter(product => product.Location.toLowerCase().includes(locationFilter.toLowerCase()));
    }

    // Filter by product name
    if (productNameFilter) {
      filteredList = filteredList.filter(product => product.ProductName.toLowerCase().includes(productNameFilter.toLowerCase()));
    }

    setFilteredProducts(filteredList);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Seller</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md"
            value={sellerFilter}
            onChange={(e) => setSellerFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md"
            value={productNameFilter}
            onChange={(e) => setProductNameFilter(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleFilter}
        >
          Apply Filters
        </button>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {filteredProducts.length} products found after filtering.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Seller</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">State</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{product.PID}</td>
                <td className="py-2 px-4 border-b">{product.ProductName}</td>
                <td className="py-2 px-4 border-b">{product.SellerEmail}</td>
                <td className="py-2 px-4 border-b">{product.date}</td>
                <td className="py-2 px-4 border-b">{product.Location}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`inline-block py-1 px-2 ${product.state === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} rounded-full`}>
                    {product.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
