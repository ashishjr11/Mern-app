import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [month, setMonth] = useState('');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      if (month) {
        const { data } = await axios.get('/api/pie-chart', { params: { month } });
        setChartData(data);
      }
    };

    fetchPieChartData();
}, [month]);

const data = {
  labels: chartData ? Object.keys(chartData) : [],
  datasets: [
    {
      label: 'Number of Items',
      data: chartData ? Object.values(chartData) : [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162,235, 0.6)',
'rgba(255, 206, 86, 0.6)',
'rgba(75, 192, 192, 0.6)',
'rgba(153, 102, 255, 0.6)',
'rgba(255, 159, 64, 0.6)',
'rgba(255, 99, 132, 0.6)',
'rgba(54, 162, 235, 0.6)',
'rgba(255, 206, 86, 0.6)',
'rgba(75, 192, 192, 0.6)',
],
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
    text: 'Number of Items per Category',
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
{chartData && <Pie data={data} options={options} />}
</div>
);
};

export default PieChart;