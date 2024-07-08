// const express = require('express');
// const { initializeDB, listTransactions, getStatistics } = require('../controllers/transactionController');

// const router = express.Router();

// router.get('/initialize', initializeDB);
// router.get('/transactions', listTransactions);
// router.get('/statistics', getStatistics);

// module.exports = router;

const express = require('express');
const { initializeDB, listTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData } = require('../controllers/transactionController');

const router = express.Router();

router.get('/initialize', initializeDB);
router.get('/api/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData); // New route for bar chart data
router.get('/pie-chart', getPieChartData); // New route for pie chart data
router.get('/combined-data', getCombinedData); // New route for combined data

module.exports = router;