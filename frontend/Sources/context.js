import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
export const Authcontext=createContext();
export const useAuth = () =>{
  console.log( "from authcontext",useContext(Authcontext))
    return useContext(Authcontext);
}
// export const useAuth = () => {
//   const { usermail, userType, LogIn, LogOut } = useContext(Authcontext);
//   return { user: { email: usermail, userType }, LogIn, LogOut };
// };

export const AuthcontextProvider = (props) => {
  const [usermail, setUsermail] = useState(null); // Change the state variable name
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const {useremail,userType }= user;
      setUsermail(useremail);
      setUserType(userType);
    }
    else{
      setError("can't fetch userinfo");
    }
  }, []);
  async function LogIn(loginEmail, loginPassword) { // Change parameter names
    try {
      const res = await axios.post('http://localhost:3002/SignInForm', {
        email_: loginEmail, // Use the parameter name
        password_: loginPassword, // Use the parameter name
      });

      if (res.data.message === 'Success') {
        const { useremail, usertype } = res.data;
        localStorage.setItem('user',JSON.stringify(res.data));
        setUsermail(useremail); // Update the state variable name
        setUserType(usertype); // Update the state variable name
        setError(null); // Clear any previous error
        return true; // Return true for successful login
      } else {
        setError("Invalid credentials. Please try again.");
        return false; // Return false for failed login
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
      return false; // Return false for failed login
    }
  }

  function LogOut() {
    setUsermail(null); // Update the state variable name
    setUserType(null);
    localStorage.clear();
     // Update the state variable name
    console.log("Logged Out");
  }

  return (
    <Authcontext.Provider value={{ usermail, userType, LogIn, LogOut }}>
      {props.children}
    </Authcontext.Provider>
  );
}
