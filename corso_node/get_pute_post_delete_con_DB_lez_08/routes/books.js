const express = require('express');
const { getDB } = require('../db');
const {objectId, ObjectId} = require('mongodb');
const bookRouter = express.Router();



// API routes
// GET /books
bookRouter.get('/', async (req, res) => {
    const books = await getDB()
        .collection("books")
        .find()
        .toArray();

    if (books.length > 0) {
        return res.json({
            success: true,
            data: books,
            message: 'questi sono tutti i libri'
        });
    }
    else {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato',
        });
    }
});

// GET /books/:id
bookRouter.get('/:id', async(req, res) => {
    const { id } = req.params;
    const book = await getDB()
        .collection("books")
        .findOne({ _id: new ObjectId(id) });
    if (book) {
        return  res.json({
            success: true,
            data: book,
            message: 'libro trovato con successo'
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
        });
    }
});

// POST /books
bookRouter.post('/', async(req, res) => {
    const newBook = req.body;
    const result = await getDB()
        .collection("books")
        .insertOne(newBook);
    return res.status(201).json({
        success: true,
        data: result,
        message: 'libro aggiunto con successo'
    });
});

// PUT /books/:id
bookRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const book = req.body;
    const result = await getDB()
        .collection("books")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: book }
        );
    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
        });       
    }
    return res.status(200).json({
            success: true,
            data: result,
            message: 'libro aggiornato con successo'
})
});

// DELETE /books/:id
bookRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const result = await getDB()
        .collection("books")
        .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });
    }
    return res.json({
        success: true,
        data: result,
        message: 'libro eliminato con successo'
    });
});

module.exports = bookRouter;