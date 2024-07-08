// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React from 'react';
// import TransactionList from './components/TransactionList';
// import Statistics from './components/Statistics';

// const App = () => {
//   return (
//     <div>
//       <h1>Product Transactions</h1>
//       <TransactionList />
//       <h1>Statistics</h1>
//       <Statistics />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './components/TransactionList';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [combinedData, setCombinedData] = useState(null);
  const [month, setMonth] = useState('');

  useEffect(() => {
    const fetchCombinedData = async () => {
      if (month) {
        const { data } = await axios.get('/api/combined-data', { params: { month } });
        setCombinedData(data);
      }
    };

    fetchCombinedData();
  }, [month]);

  return (
    <div>
      <h1>Product Transactions</h1>
      <TransactionList />
      <h1>Statistics</h1>
      <Statistics />
      <h1>Price Range Bar Chart</h1>
      <BarChart />
      <h1>Category Pie Chart</h1>
      <PieChart />
      {combinedData && (
        <div>
          <h1>Combined Data</h1>
          <pre>{JSON.stringify(combinedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;