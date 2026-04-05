import 'dotenv/config';
import cors from 'cors'
import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// 2. Use process.env instead of importing from config.js
const PORT = process.env.PORT || 5555;
const MongoDBURL = process.env.MONGO_URI;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(234).send("Welcome to my page");
});

app.use('/book', booksRoute);

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`The app is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });