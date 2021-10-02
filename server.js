const dotenv = require("dotenv");
const express = require("express");

// BUILT INs
const AuthRouter = require("./server/routes/authRoute");
const DataBase = require("./server/database/DB"); //Database connector

dotenv.config({});

const app = express();

app.use(express.json());

app.use("/api/v1/auth", AuthRouter); //Authentication routes

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Sorry Error is our fault, we will send our engineers ASAP",
  });
  next();
});

// 404 ERROR
app.use((req, res, next) => {
  res.status(404).json({ message: "Oops, page not found" });
  next();
});
// DATABASE and SERVER running together.
const PORT = process.env.PORT;
DataBase(() =>
  app.listen(3000, () =>
    console.log(`server currently running at port ${PORT}`)
  )
);
