import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [month, setMonth] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (month) {
        const { data } = await axios.get('/api/statistics', { params: { month } });
        setStats(data);
      }
    };

    fetchStatistics();
  }, [month]);
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
      {stats && (
        <div>
          <p>Total Sale Amount: ${stats.totalSaleAmount}</p>
          <p>Total Sold Items: {stats.totalSoldItems}</p>
          <p>Total Not Sold Items: {stats.totalNotSoldItems}</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;