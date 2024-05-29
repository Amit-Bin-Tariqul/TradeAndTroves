import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const loc = useLocation();
  console.log(loc.state);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { email, type } = loc.state;
        const response = await axios.get("/transactions", {
          params: { email, usertype: type },
        });
        setTransactions(response.data.user);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    
    fetchData();
  }, [loc.state]);

  
  const handleConfirmDelivery = async (transactionID) => {
    if (!buttonClicked) {
      try {
        const response = await axios.post("confirmDelivery", {
          transactionID,
          userType: loc.state.type, // or 'buyer' based on the user type
        });

        if (response.data.success) {
          console.log("Success");
          setButtonClicked(true); // Set button state to clicked
        } else {
          console.error("Failed to confirm delivery");
        }
      } catch (error) {
        console.error("Error confirming delivery:", error);
      }
    }
  };

  return (
    <div>
      <h2 class="middle_and_bold">Order Details</h2>

      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction.TransactionID} className="order-container">
            <h3 class="Transaction_id">
              Transaction ID: {transaction.TransactionID}
            </h3>
            {/* kiranTable */}

            <table className="order-table">
              <thead>
                <tr>
                  <th class="thtdKiran">BuyerEmail</th>
                  <td class="thtdKiran">{transaction.BuyerEmail}</td>
                </tr>

                <tr>
                  <th class="thtdKiran">SellerEmail</th>
                  <td class="thtdKiran">{transaction.SellerEmail}</td>
                </tr>

                <tr>
                  <th class="thtdKiran">PID</th>
                  <td class="thtdKiran">{transaction.PID}</td>
                </tr>

                <tr>
                  <th class="thtdKiran">ProductName</th>
                  <td class="thtdKiran">{transaction.ProductName}</td>
                </tr>

                <tr>
                  <th>Quantity</th>
                  <td>{transaction.Quantity}</td>
                </tr>

                <tr>
                  <th class="thtdKiran">TotalPrice</th>
                  <td class="thtdKiran">{transaction.TotalPrice}</td>
                </tr>

                <tr>
                  <th class="thtdKiran">TimeofTransaction</th>
                  <td class="thtdKiran">{transaction.TimeofTransaction}</td>
                </tr>
              </thead>
            </table>
            <button
              className={`confirm-delivery-button ${
                buttonClicked ? 'button-disabled' : ''
              }`}
              onClick={() => handleConfirmDelivery(transaction.TransactionID)}
              disabled={buttonClicked}
            >
              {loc.state.type === 'seller' ? 'Confirm Delivery' : 'Confirm Receive'}
            </button>
            {/* kiranTable */}
          </div>
        ))
      ) : (
        <p>No orders made</p>
      )}
    </div>
  );
};

export default OrderDetails;

// Amit

// <table className="order-table">
//               <thead>
//                 <tr>
//                   <th>BuyerEmail</th>
//                   <th>SellerEmail</th>
//                   <th>PID</th>
//                   <th>ProductName</th>
//                   <th>Quantity</th>
//                   <th>TotalPrice</th>
//                   <th>TimeofTransaction</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{transaction.BuyerEmail}</td>
//                   <td>{transaction.SellerEmail}</td>
//                   <td>{transaction.PID}</td>
//                   <td>{transaction.ProductName}</td>
//                   <td>{transaction.Quantity}</td>
//                   <td>{transaction.TotalPrice}</td>
//                   <td>{transaction.TimeofTransaction}</td>
//                 </tr>
//               </tbody>
//             </table>
