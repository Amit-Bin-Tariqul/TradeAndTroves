import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import './UserDetailsTable.css'; 


function UserDetails() {
    const location = useLocation();

    const [users,setUsers] = useState([]);
    
    const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`/getUserDetails?name=${location.state.nam}`);
          if (response.data.user) {
            //console.log(response.data.user);
            setUsers(response.data.user);
            //console.log(users);
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
      }, []);

      useEffect(() => {
        console.log('Updated users:', users);
      }, [users]); // Add a dependency on the users state

    console.log(location.state);
    return (
        <div className="container">
      <h2>User Details</h2>
      <div className="user-details-table-container">
        <table className="user-details-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Image</th>
              <th>UserType</th>
              <th>Rating</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Longitude</th>
              <th>Latitude</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.image}</td>
                <td>{user.usertype === 0 ? 'Buyer' : 'Seller'}</td>
                <td>{user.rating}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.Longitude}</td>
                <td>{user.Latitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default UserDetails;