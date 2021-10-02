const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectionDB = async (cb) => {
  try {
    const options = {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const connection = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`Database running at ${connection.connection.host}`);
    cb();
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectionDB;
