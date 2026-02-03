const express = require('express');
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const bookRouter = express.Router();

// GET /books
bookRouter.get('/', async (req, res) => {

    try {
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
    }
    catch (error) {
        // gestisco l'errore
        console.error(`Errore durante il metodo GET dei libri: ${error}`);
        return res.status(500).json({
            success: false,
            message: `Errore durante il metodo GET dei libri: ${error}`,
            error: error
        });
    }

});

// GET /books/:id
bookRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // se id non e' un ObjectId valido, ritorna errore 400        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `id non valido: ${id}`
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
    }
    catch (error) {
        console.error(`Errore durante il metodo GET del libro per ID: ${error}`);
        return res.status(500).json({
            success: false,
            message: `Errore durante il metodo GET del libro per ID: ${error}`,
            error: error
        });
    }

});

// POST /books
bookRouter.post('/', async (req, res) => {
    try {
        const newBook = req.body;

        // campi obligatori
        if (!newBook.title || !newBook.num_pag) {
            return res.status(400).json({
                success: false,
                message: 'title e num_pag sono campi obbligatori'
            });
        }
        // PROVA TU: QUANDO VIENE CREATO IL BOOK DEVONO ESSERCI SOLO I CAMPI:
        // TITLE E NUM_PAG OBBLIGATORI, ISAVAILABLE E' OPZIONALE, NON DEVONO ESSERCI ALTRI CAMPI
        // SE CI SONO ALTRI CAMPI RITORNA ERRORE 400 CON MESSAGGIO DEI CAMPI NON CONSENTITI

        
        const allowedFields = ['title', 'num_pag', 'author', 'genere', 'anno_pubblicazione', 'isAvailable'];
        const newBookKeys = Object.keys(newBook);
        const invalidFields = newBookKeys.filter(key => !allowedFields.includes(key));
        if (invalidFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `I seguenti campi non sono consentiti: ${invalidFields.join(', ')}`
            });
        }

        const result = await getDB()
            .collection('books')
            .insertOne(newBook);

        res.status(201).json({
            success: true,
            data: newBook,
            message: 'nuovo libro aggiunto con successo'
        });
    } catch (error) {
        console.error(`Errore durante il metodo POST del libro: ${error}`);
        return res.status(500).json({
            success: false,
            message: `Errore durante il metodo POST del libro: ${error}`,
            error: error
        });
    }
});

// PUT /books/:id
bookRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `id non valido: ${id}`
            });
        }
        const book = req.body;                  // book da aggiornare, ma sono solo le proprietà che vogliamo aggiornare

        const result = await getDB()
            .collection('books')
            .updateOne(                             //  fai l'update di un ssolo record
                { _id: new ObjectId(id) },            // il record da aggiornare è quello con _id = id   
                { $set: book }                        // sovrascrivi i campi con i valori di book
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
    } catch (error) {
        console.error(`Errore durante il metodo PUT del libro: ${error}`);
        return res.status(500).json({
            success: false,
            message: `Errore durante il metodo PUT del libro: ${error}`,
            error: error
        });
    }
})

// DELETE /books/:id
bookRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `id non valido: ${id}`
            });
        }
        const result = await getDB()
            .collection('books')
            .deleteOne({ _id: new ObjectId(id) });
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
    } catch (error) {
        console.error(`Errore durante il metodo DELETE del libro: ${error}`);
        return res.status(500).json({
            success: false,
            message: `Errore durante il metodo DELETE del libro: ${error}`,
            error: error
        });
    }
});

module.exports = bookRouter;
