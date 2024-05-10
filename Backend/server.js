const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//ecpress app
const app = express();
dotenv.config();

//require routes
const reservationRoutes = require('./routes/reservation.js'); 






//middleware
//app.use(express.json);
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});



//routes 
app.use('/api/reservation', reservationRoutes);





const PORT = process.env.PORT || 8020;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.on("error", err => {
  console.error("MongoDB connection error:", err);
});

connection.once("open", () => {
  console.log("MongoDB Connection Successful!");
});


//listen to reqs
app.listen(PORT, err => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is UP! Running on port : ${PORT}`);
  }
});



