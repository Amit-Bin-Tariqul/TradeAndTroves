import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const DummyChart = () => {
  const [chartData, setChartData] = useState({
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
  });

  useEffect(() => {
    // Simulate fetching data from the backend
    const salesData = getRandomData(7, 5000, 10000);
    setChartData({
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          ...chartData.datasets[0],
          data: salesData,
        },
      ],
    });
  }, []); // Empty dependency array to run the effect only once

  const getRandomData = (count, min, max) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Sales Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DummyChart;
