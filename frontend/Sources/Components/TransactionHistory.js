// TransactionHistory.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderDetails.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const getEmail = localStorage.getItem('emailData');


  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get("/transactionhistory", {
          params: {
            email: getEmail, // Assuming the server expects the email as a query parameter
          },
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div>
      <h2 className="middle_and_bold">Transaction History</h2>

      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction.TransactionID} className="order-container">
            <h3 className="Transaction_id">
              Transaction ID: {transaction.TransactionID}
            </h3>

            <table className="order-table">
              <thead>
                <tr>
                  <th className="thtdKiran">BuyerEmail</th>
                  <td className="thtdKiran">{transaction.BuyerEmail}</td>
                </tr>

                <tr>
                  <th className="thtdKiran">SellerEmail</th>
                  <td className="thtdKiran">{transaction.SellerEmail}</td>
                </tr>

                <tr>
                  <th className="thtdKiran">PID</th>
                  <td className="thtdKiran">{transaction.PID}</td>
                </tr>

                <tr>
                  <th className="thtdKiran">ProductName</th>
                  <td className="thtdKiran">{transaction.ProductName}</td>
                </tr>

                <tr>
                  <th>Quantity</th>
                  <td>{transaction.Quantity}</td>
                </tr>

                <tr>
                  <th className="thtdKiran">TotalPrice</th>
                  <td className="thtdKiran">{transaction.TotalPrice}</td>
                </tr>

                <tr>
                  <th className="thtdKiran">Time of Transaction</th>
                  <td className="thtdKiran">{transaction.TimeofTransaction}</td>
                </tr>
              </thead>
            </table>
          </div>
        ))
      ) : (
        <p>No transactions in history</p>
      )}
    </div>
  );
};

export default TransactionHistory;
