const { connectDatabase } = require("./config/db");
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();
connectDatabase();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
