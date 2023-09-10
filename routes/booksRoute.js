const express = require('express')
const Book = require('../models/bookModel.js')

const router = express.Router();

// get all books
router.get('/', async (req, res)=>{
    try {
        const books = await Book.find({});
        res.status(200).send({
            count : books.length,
            data : books
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// save a new book
router.post('/', async(req, res)=>{
    try {
        // console.log(req.body);
        // validate if input is correct
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
            ){
                res.status(400).send({
                    message : "Send all req fields : title, author, pubhlishYear",
                })
            }

            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear,
            };
            // console.log(newBook.title)
            const book = await Book.create(newBook);

            return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }
})

// update a book
router.put('/:id', async(req, res)=>{
    try {
        
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
            ){
                res.status(400).send({
                    message : "Send all req fields : title, author, pubhlishYear",
                })
            }
        
            const id = req.params.id;
            const result = await Book.findByIdAndUpdate(id, req.body);
            const books = await Book.find({});
            if(!result){
                res.status(404).json({ message : 'Book not found'})
            }
            
            res.status(200).json({ books , message : 'Book updated successfully' });

    } catch (error) {
        res.status(500).send(error.message);
    }
})

// delete a book 
router.delete('/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(400).json({message : 'Book Not Found'})
        }

        return res.status(200).json({message : 'Book successfully deleted'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }
})

// get book by id
router.get('/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;