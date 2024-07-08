import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [month, setMonth] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      if (month) {
        const { data } = await axios.get('/api/bar-chart', { params: { month } });
        setChartData(data);
      }
    };

    fetchBarChartData();
  }, [month]);
  const data = {
    labels: chartData ? Object.keys(chartData) : [],
    datasets: [
      {
        label: 'Number of Items',
        data: chartData ? Object.values(chartData) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Items per Price Range',
      },
    },
  };
  return (
    <div>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Select Month</option>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
          (m) => (
            <option key={m} value={m}>
              {m}
            </option>
          )
        )}
      </select>
      {chartData && <Bar data={data} options={options} />}
    </div>
  );
};

export default BarChart;