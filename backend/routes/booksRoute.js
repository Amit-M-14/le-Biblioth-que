import express from "express";
import { Book } from "../models/bookmodels.js";

const router = express.Router();

// Route to save a new book into database
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields : title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all book from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get 1 book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundbook = await Book.findById(id);
    if (!foundbook) {
      return res.status(404).json({ message: "book not fund" });
    }
    return res.status(200).json(foundbook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields : title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found!" });
    }

    return res.status(200).json({ message: "Book updated successfully " });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for deleting a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found! " });
    }
    return res.status(200).json({ message: "Book is successfully deleted " });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;