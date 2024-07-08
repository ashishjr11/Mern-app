// const axios = require('axios');
// const Transaction = require('../models/transactionModel');

// const initializeDB = async (req, res) => {
//   try {
//     const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
//     const data = response.data;

//     await Transaction.deleteMany({}); // Clear existing data

//     for (const item of data) {
//       const transaction = new Transaction({
//         title: item.title,
//         description: item.description,
//         price: item.price,
//         dateOfSale: new Date(item.dateOfSale),
//         sold: item.sold,
//       });
//       await transaction.save();
//     }

//     res.status(201).json({ message: 'Database initialized with seed data' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const listTransactions = async (req, res) => {
//     try {
//       const { search = '', page = 1, perPage = 10 } = req.query;
//       const query = {
//         $or: [
//           { title: new RegExp(search, 'i') },
//           { description: new RegExp(search, 'i') },
//           { price: { $regex: new RegExp(search, 'i') } },
//         ],
//       };
  
//       const transactions = await Transaction.find(query)
//         .skip((page - 1) * perPage)
//         .limit(Number(perPage));
  
//       const total = await Transaction.countDocuments(query);
  
//       res.json({ total, page: Number(page), perPage: Number(perPage), transactions });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   const getStatistics = async (req, res) => {
//     try {
//       const { month } = req.query;
  
//       if (!month) {
//         return res.status(400).json({ message: 'Month is required' });
//       }
  
//       const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1; // Using a leap year for consistent date parsing
  
//       const transactions = await Transaction.find({
//         dateOfSale: { $gte: new Date(`2020-${monthNumber}-01`), $lt: new Date(`2020-${monthNumber + 1}-01`)},
//       });
  
//       const totalSaleAmount = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
//       const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
//       const totalNotSoldItems = transactions.length - totalSoldItems;
  
//       res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   module.exports = {
//     initializeDB,
//     listTransactions,
//     getStatistics,
//   };

const axios = require('axios');
const Transaction = require('../models/transactionModel');

const initializeDB = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.json();

    await Transaction.deleteMany({}); 

    for (const item of data) {
      const transaction = new Transaction({
        title: item.title,
        description: item.description,
        price: item.price,
        dateOfSale: new Date(item.dateOfSale),
        sold: item.sold,
        category: item.category, // Assuming there is a category field in the data
      });
      await transaction.save();
    }

    res.status(201).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listTransactions = async (req, res) => {
  try {
    const { search = '', page = 1, perPage = 10 } = req.query;
    const query = {
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: { $regex: new RegExp(search, 'i') } },
      ],
    };

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const total = await Transaction.countDocuments(query);

    res.json({ total, page: Number(page), perPage: Number(perPage), transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month is required' });
    }

    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1; // Using a leap year for consistent date parsing

    const transactions = await Transaction.find({
      dateOfSale: { $gte: new Date(`2020-${monthNumber}-01`), $lt: new Date(`2020-${monthNumber + 1}-01`) },
    });

    const totalSaleAmount = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
    const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month is required' });
    }

    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1; // Using a leap year for consistent date parsing

    const transactions = await Transaction.find({
      dateOfSale: { $gte: new Date(`2020-${monthNumber}-01`), $lt: new Date(`2020-${monthNumber + 1}-01`) },
    });

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };
    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price >= 0 && price <= 100) priceRanges['0-100']++;
      else if (price >= 101 && price <= 200) priceRanges['101-200']++;
      else if (price >= 201 && price <= 300) priceRanges['201-300']++;
      else if (price >= 301 && price <= 400) priceRanges['301-400']++;
      else if (price >= 401 && price <= 500) priceRanges['401-500']++;
      else if (price >= 501 && price <= 600) priceRanges['501-600']++;
      else if (price >= 601 && price <= 700) priceRanges['601-700']++;
      else if (price >= 701 && price <= 800) priceRanges['701-800']++;
      else if (price >= 801 && price <= 900) priceRanges['801-900']++;
      else if (price >= 901) priceRanges['901-above']++;
    });

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month is required' });
    }

    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1; // Using a leap year for consistent date parsing

    const transactions = await Transaction.find({
      dateOfSale: { $gte: new Date(`2020-${monthNumber}-01`), $lt: new Date(`2020-${monthNumber + 1}-01`) },
    });

    const categoryCounts = {};

    transactions.forEach(transaction => {
      const category = transaction.category || 'Unknown'; // Assuming there is a category field in the data
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
    res.json(categoryCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month is required' });
    }

    const statistics = await getStatistics(req, res, true);
    const barChartData = await getBarChartData(req, res, true);
    const pieChartData = await getPieChartData(req, res, true);

    res.json({
      statistics,
      barChartData,
      pieChartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initializeDB,
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
};