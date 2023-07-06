const express = require('express');
const bookRouter = express.Router();
const {BookModel} = require('../models/book.model')
require('dotenv').config;

bookRouter.post('/add', async(req, res) => {
   const payload = req.body;
   try {
    const newBook = new BookModel(payload);
    await newBook.save();
    res.status(200).json({message:"Book added successfully"})
   } catch (error) {
    res.status(500).json({error:"Something went wrong"})
    console.log(error)
   }
});

bookRouter.get('/get', async(req, res) => {
    try {
     const books = await BookModel.find();
     console.log(books)
     if(!books[0]) return res.status(404).json({message:"No book available"});
     res.status(200).send(books);
    } catch (error) {
     res.status(500).json({error:"Something went wrong"})
     console.log(error)
    }
 });

 bookRouter.get('/filter', async(req, res) => {
    const {filter, sort} = req.query
    try {
     const books = await BookModel.find({Genre:filter}).sort(`-${sort}`);
     if(!books[0]) return res.status(404).json({message:"No book available"});
     res.status(200).send(books);
    } catch (error) {
     res.status(500).json({error:"Something went wrong"})
     console.log(error)
    }
 });

 bookRouter.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const findBook = await BookModel.findById(id);
        if(!findBook) return res.status(404).json({message:"No book found"});
        await BookModel.findByIdAndDelete(id)
        res.status(200).json({
            message:"Book deleted successfully",
            book:findBook
        });
    } catch (error) {
     res.status(500).json({error:"Something went wrong"})
     console.log(error)
    }
 });

module.exports = {bookRouter}