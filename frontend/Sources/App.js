import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TogglePage from './Components/TogglePage';
import TogglePage2 from './Components/TogglePage2';
import Navbar from './Components/Navbar';
import SignUpForm from './Components/SignUpForm';
import LoginPage from './Components/LoginPage';
import Home from './Components/Home'
import ForgetPass from './Components/ForgetPass';
import ConfirmOTP from './Components/ConfirmOTP';
import ResetPassword from './Components/ResetPassword';
import ProductWelcome from './Components/ProductWelcome';
import { AuthcontextProvider } from './Context/context';
import ProductDataForm from './Components/ProductDataForm';
import UserProfile from './Components/UserProfile';
import Added from './Components/Added';
import Map from './Components/Map'
import Location from './Components/Location';
import UserDetails from './Components/UserDetails';
import ProductBuy from './Components/ProductBuy';
import SellerProfile from './Components/SellerProfile'
import PaymentSuccess from './Components/PaymentSuccess'
import CartInfo from './Components/CartInfo'
import Blogs from './Components/Blogs';
import Sell from './Components/Sell';
import Mobile from './Components/Mobile';
import Dashboard from './Components/Dashboard'
import Dummy from './Components/DummyChart'
import SaleAnalyze from './Components/SaleAnalyze';
import ChatPage from './Components/ChatPage';
import MessageForm from './Components/MessageForm';
import MyMessage from './Components/MyMessage';
import TheirMessage from './Components/TheirMessage';
import ChatFeed from './Components/ChatFeed';
import RequestPage from './Components/RequestPage';
import RequestWelcome from './Components/RequestWelcome';
import Laptop from './Components/Laptop';
import Tablet from './Components/Tablet';
import OrderDetails from './Components/OrderDetails';
import TransactionHistory from './Components/TransactionHistory';

function
  App() {
  return (
    <div className="App">
      <AuthcontextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route exact path="/" element={</>} /> */}
            <Route exact path="/TogglePage" element={<TogglePage />} />
            <Route exact path="/TogglePage2" element={<TogglePage2 />} />
            <Route exact path="/SignUpForm" element={<SignUpForm />} />
            <Route exact path="/LoginPage" element={<LoginPage />} />
            <Route exact path="/ForgetPass" element={<ForgetPass />} />
            <Route exact path="/ConfirmOTP" element={<ConfirmOTP />} />
            <Route exact path="/ResetPassword" element={<ResetPassword />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/ProductDataForm" element={<ProductDataForm />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Added" element={<Added />} />
            <Route path="/Map" element={<Map />}></Route>
            <Route path="/Location" element={<Location />}></Route>
            <Route path="/UserDetails" element={<UserDetails />}></Route>
            <Route path="/ProductWelcome/:id" element={<ProductWelcome />} />
            <Route path="/ProductBuy" element={<ProductBuy />} />
            <Route path="/SellerProfile" element={<SellerProfile />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/CartInfo" element={<CartInfo />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/Sell" element={<Sell />} />
            <Route path="/Mobile" element={<Mobile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Dummy" element={<Dummy />} />
            <Route path="/SaleAnalyze" element={<SaleAnalyze />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/TheirMessage" element={<TheirMessage />} />
            <Route path="/MyMessage" element={<MyMessage />} />
            <Route path="/ChatFeed" element={<ChatFeed />} />
            <Route path="/Laptop" element={<Laptop/>} />
            <Route path="/Tablet" element={<Tablet/>} />
            <Route path="/RequestPage" element={<RequestPage />} />
            <Route path="/RequestWelcome/:id" element={<RequestWelcome />} />
            <Route path="/OrderDetails" element={<OrderDetails/>} />
          <Route path="/TransactionHistory" element={<TransactionHistory/>} />
          </Routes>
        </BrowserRouter>
      </AuthcontextProvider>
    </div>
  );
}

export default App;
