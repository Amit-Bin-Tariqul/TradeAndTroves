import React, { useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';
import ProductList from './productList';
import {  useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productNum, setProductNum] = useState(0);
  const [userNum, setUserNum] = useState(0);
  const navigate=useNavigate();
  const [chartData, setChartData] = useState({
    sales: {
      labels: [],
      datasets: [
        {
          label: 'Total Sales',
          data: [],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
        },
      ],
    },
    users: {
      labels: [],
      datasets: [
        {
          label: 'Total Users',
          data: [],
          fill: false,
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2,
        },
      ],
    },
  });

  const dummyData = {
    totalUsers: userNum,
    totalProducts: productNum,
    totalSales: 50000,
  };

  useEffect(() => {
    // Simulate fetching data from the backend
    setTimeout(() => {
      setTotalUsers(dummyData.totalUsers);
      setTotalProducts(dummyData.totalProducts);
      setTotalSales(dummyData.totalSales);
      const salesData = getRandomData(7, 5000, 10000);
      const userData = getRandomData(7, 100, 200);
      
      setChartData((prevChartData) => ({
        ...prevChartData,
        sales: {
          ...prevChartData.sales,
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [
            {
              ...prevChartData.sales.datasets[0],
              data: salesData,
            },
          ],
        },
        users: {
          ...prevChartData.users,
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [
            {
              ...prevChartData.users.datasets[0],
              data: userData,
            },
          ],
        },
      }));
    }, 1000); // Simulating a delay for API call
  }, [productNum]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/getproductNum');
        const getData = await response.json();
        setProductNum(getData[0]?.total || 0);
      } catch (error) {
        console.error('Error fetching products Number:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/getuserNum');
        const getData = await response.json();
        setUserNum(getData[0]?.total || 0);
      } catch (error) {
        console.error('Error fetching userNumber:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getRandomData = (count, min, max) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  };
  const handleSalesAnalysis = () =>{
    navigate('/SaleAnalyze')
   }

  return (
    <div>
      <div className="relative">


        <div className="container mx-auto mt-10 p-6 bg-white border rounded shadow">
          <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-500 text-white rounded-md">
              <span className="font-bold block mb-2 text-lg">Total Users</span>
              <span className="font-bold block mb-2 text-lg">{userNum}</span>
            </div>
            <div className="p-4 bg-green-500 text-white rounded-md">
              <span className="font-bold block mb-2 text-lg">Total Products</span>
              <span className="font-bold block mb-2 text-lg">{totalProducts}</span>
            </div>
            <div>
            <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleSalesAnalysis}
        >
         Analyze Sales
        </button>
            </div>
            <div className="p-4 bg-orange-500 text-white rounded-md">
              <span className="font-bold block mb-2 text-lg">Total Sales</span>
              <span className="font-bold block mb-2 text-lg">${totalSales}</span>
            </div>
          </div>
          {/* Add the rest of your content here */}
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
