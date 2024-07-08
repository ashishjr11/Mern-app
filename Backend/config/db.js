// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//    // console.log(MongoDB Connected: ${conn.connection.host});
//   } catch (error) {
//    // console.error(Error: ${error.message});
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL;

exports.connectDatabase = () => {
  // connection to the database
  mongoose
    .connect(`${process.env.MONGO_URL}/Assignment`)
    .then(() => {
      console.log("the mongodb is successfully connected");
    })
    .catch((error) => {
      ``;
      console.log("error in connecting with mongodb server");
    });
};
