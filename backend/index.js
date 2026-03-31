import express, { request } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// middleware for parsing the request body
app.use(express.json());

app.get("/", (req, res) => {
  res.status(234).send("Welcome to my page");
});


app.use('/book', booksRoute);

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`The app is listening ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
