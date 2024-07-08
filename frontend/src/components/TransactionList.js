import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get('/api/transactions', {
        params: { search, page, perPage },
      });
      setTransactions(data.transactions);
      setTotal(data.total);
    };

    fetchTransactions();
  }, [search, page, perPage]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {transactions.map((transaction) => (
          <div key={transaction._id}>
            <h3>{transaction.title}</h3>
            <p>{transaction.description}</p>
            <p>${transaction.price}</p>
            <p>{transaction.sold ? 'Sold' : 'Not Sold'}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page * perPage >= total}>
          Next
        </button>
      </div>
    </div>
  );
};
export default TransactionList;