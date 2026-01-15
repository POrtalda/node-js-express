const express = require('express');
const {getDB} = require('../db');
const bookRouter = express.Router();

// let books = [
//     {id: "B001", title: "1984", author: "George Orwell", price: 15.99, isAvailable: true},
//     {id: "B002", title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, isAvailable: true},
//     {id: "B003", title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, isAvailable: false}
// ];

// API routes
bookRouter.get('/', async(req, res) => {
    // res.json({
    //     success: true,
    //     data: books,
    //     message: 'questi sono tutti i libri'
    const books = await getDB()
    .collection('books')   // legge dalla collection books
    .find()                // prende i documents
    .toArray();            // li trasforma in array
    res.status(200).json({
        success: true,
        data: books,
        message: 'questi sono tutti i libri'
    });
});

// GET /books/:id
bookRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato  con questo id',
            data: null
        });
    }
    res.status(200).json({
        success: true,
        data: book,
        message: 'questo libro è stato trovato con questo id'
    });
});

// POST /books
bookRouter.post('/', (req, res) => {
    const newBook = req.body;
    newBook.id = crypto.randomUUID();
    books.push(newBook);
    res.status(201).json({
        success: true,
        data: newBook,
        message: 'nuovo libro aggiunto con successo'
    });
});

// PUT /books/:id
bookRouter.put('/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find(b => b.id === id);                  // book da aggiornare
    if (book) {
        const bookToUpdate = {...book, ...req.body};               // libro aggiornato
        books = books.map(b => b.id ===id ? bookToUpdate : b);     // aggiorno l'array dei libri
        res.status(200).json({                                                 // risposta al client
            success: true,           
            data: bookToUpdate,
            message: 'libro aggiornato con successo'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });
    }
})

// DELETE /books/:id
bookRouter.delete('/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find(book => book.id === id);
    if (book) {
            books = books.filter(book => book.id !== id);
            res.status(200).json({
                success: true,
                data: books,
                message: 'libro eliminato con successo'
            });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });
    };
});

module.exports = bookRouter;