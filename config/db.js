const mongoose = require("mongoose");

function connectDB() {
  const url = process.env.DB_URL;

  try {
    mongoose.connect(url, {
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
}

module.exports = { connectDB }