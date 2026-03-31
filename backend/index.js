import express, { request } from "express";
import { PORT,MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(234).send('Welcome to my page');
});
// Route to save a new book into database

app.post('/book',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:'send all required fields : title, author, publishYear',});
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        };

        const book = await Book.create(newBook);

        res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
})

mongoose
    .connect(MongoDBURL)
    .then(()=>{
        console.log('App connected to database.');
        app.listen(PORT , ()=>{
            console.log(`The app is listening ${PORT}`);
        })   
    })
    .catch((error)=>{
        console.log(error);
    })