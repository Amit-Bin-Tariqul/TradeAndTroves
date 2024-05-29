import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleAnalyze = () => {
  const [totalSalesByProduct, setTotalSalesByProduct] = useState([]);
  const [totalSalesByBuyer, setTotalSalesByBuyer] = useState([]);
  const [salesLastWeek, setSalesLastWeek] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const productResponse = await axios.get('http://localhost:3002/salesby-product');
      setTotalSalesByProduct(productResponse.data);

      const buyerResponse = await axios.get('http://localhost:3002/salesby-buyer');
      setTotalSalesByBuyer(buyerResponse.data);

      const lastWeekResponse = await axios.get('http://localhost:3002/sales-last-week');
      setSalesLastWeek(lastWeekResponse.data);

      const pendingTransactionsResponse = await axios.get('http://localhost:3002/get-pending-transactions');
      setPendingTransactions(pendingTransactionsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Sales Analysis</h1>

      {/* Total Sales by Product */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Sales by Product</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Total Quantity</th>
              <th className="py-2 px-4 border-b">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {totalSalesByProduct.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">{item.ProductName}</td>
                <td className="py-2 px-4 border-b">{item.TotalQuantity}</td>
                <td className="py-2 px-4 border-b">{item.TotalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Sales by Buyer */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Total Sales by Buyer</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Buyer Email</th>
              <th className="py-2 px-4 border-b">Total Transactions</th>
              <th className="py-2 px-4 border-b">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {totalSalesByBuyer.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">{item.BuyerEmail}</td>
                <td className="py-2 px-4 border-b">{item.TotalTransactions}</td>
                <td className="py-2 px-4 border-b">{item.TotalSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales in Last Week */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sales in Last Week</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {salesLastWeek.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">{item.ProductName}</td>
                <td className="py-2 px-4 border-b">{item.TotalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Transactions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Pending Transactions</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Transaction ID</th>
              <th className="py-2 px-4 border-b">Buyer Email</th>
              <th className="py-2 px-4 border-b">Seller Email</th>
            </tr>
          </thead>
          <tbody>
            {pendingTransactions.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">{transaction.TransactionID}</td>
                <td className="py-2 px-4 border-b">{transaction.BuyerEmail}</td>
                <td className="py-2 px-4 border-b">{transaction.SellerEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleAnalyze;
