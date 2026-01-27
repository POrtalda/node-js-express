const express = require('express');
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const bookRouter = express.Router();

// GET /books
bookRouter.get('/', async (req, res) => {
    const books = await getDB()
        .collection('books')
        .find()
        .toArray();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        data: books,
        message: 'questi sono tutti i libri'
    });
});

// GET /books/:id
bookRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID non valido'
        });
    }

    const book = await getDB()
        .collection('books')
        .findOne({ _id: new ObjectId(id) });

    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        data: book,
        message: 'questo libro è stato trovato con successo'
    });
});

// POST /books
bookRouter.post('/', async (req, res) => {
    const newBook = req.body;

    const result = await getDB()
        .collection('books')
        .insertOne(newBook);
        
    
    
    res.status(201).json({
        success: true,
        data: newBook,
        message: 'nuovo libro aggiunto con successo'
    });
});

// PUT /books/:id
bookRouter.put('/:id', async(req, res) => {
    const {id} = req.params;
    const book = req.body;                  // book da aggiornare, ma sono solo le proprietà che vogliamo aggiornare

    const result = await getDB()
    .collection('books')
    .updateOne(                             //  fai l'update di un ssolo record
        {_id: new ObjectId(id)},            // il record da aggiornare è quello con _id = id   
        {$set: book}                        // sovrascrivi i campi con i valori di book
    );
    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });        
    }
    return res.status(200).json({
        success: true,
        data: book,
        message: 'libro aggiornato con successo'
    });
})

// DELETE /books/:id
bookRouter.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const result = await getDB()
    .collection('books')
    .deleteOne({_id: new ObjectId(id)});
    if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });        
    }
    return res.status(200).json({
        success: true,
        message: 'libro eliminato con successo'
    });
});

module.exports = bookRouter;
