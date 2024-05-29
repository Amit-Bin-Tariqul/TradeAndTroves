import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get('transactionId');

  return (
    <center>
    <div className="payment-success-container">
      {/* Background image with opacity */}
      <div className="background-image"></div>

      {/* Checkmark icon (you can replace this with your own checkmark icon) */}
      <div className="checkmark">✔</div>

      <h1 className="payment-success-heading">Payment Success</h1>
      <p className="payment-success-message">Transaction ID: {transactionId}</p>
      {/* Other content for the success page */}
    </div>
    </center>
  );
};

export default PaymentSuccess;
