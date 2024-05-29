// src/Sidebar.js
import React from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-13 left-0 w-64 bg-gray-800 text-white overflow-y-auto transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300`}>
      <div className="p-4">
        <button className= "fixed top-0 my-0  p-2 right-0  bg-inherit text-white" onClick={onClose}>
        <i class="fa-solid fa-xmark fa-2xl"></i></button>
      </div>
      <ul className=" mx-6  py-4">
        <li className="py-4 font-semibold text-lg">Settings</li>
        <li className="py-4 font-semibold text-lg">Users</li>
        <li className="py-4 font-semibold text-lg">Requests</li>
      </ul>
    </div>
  );
};

export default Sidebar;
