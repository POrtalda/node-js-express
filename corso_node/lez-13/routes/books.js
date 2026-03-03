const express = require('express');
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');
const authMiddleware = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/requireRole');

const bookRouter = express.Router();

// rottaper fare test e capire req.user 
// che viene aggiunto dal middleware di autenticazione
bookRouter.get('/me', authMiddleware, (req, res) => {
return res.json(req.user);
});

// GET /api/books
bookRouter.get('/', authMiddleware, async (req, res) => {

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
bookRouter.post('/' ,async (req, res) => {
    try {
        const newBook = req.body;

        // campi obligatori
        // TITLE E AUTHOR OBBLIGATORI, SE MANCANO RITORNA ERRORE 400
        if (!newBook.title || !newBook.author) {
            return res.status(400).json({
                success: false,
                message: 'title e author sono campi obbligatori'
            });
        }

        // controlla che non ci siano campi non consentiti, se ci sono ritorna errore 400
        for (let key in newBook) {
            if (!['title', 'author', 'is_available'].includes(key)) {
                return res.status(400).json({
                    success: false,
                    message: `il libro non può avere il campo ${key}, i campi consentiti sono: title, author e is_available (opzionale)`
                });
            }
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
bookRouter.delete('/:id', authMiddleware, requireRole('admin'),async (req, res) => {
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
