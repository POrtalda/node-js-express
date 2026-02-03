const express = require('express');
const { getDB } = require('../db');
const {objectId, ObjectId} = require('mongodb');
const usersRouter = express.Router();



// API routes
// GET /users
usersRouter.get('/', async (req, res) => {
    const users = await getDB()
        .collection("users")
        .find()
        .toArray();

    if (users.length > 0) {
        return res.json({
            success: true,
            data: users,
            message: 'questi sono tutti gli utenti'
        });
    }
    else {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato',
        });
    }
});

// GET /users/:id
usersRouter.get('/:id', async(req, res) => {
    const { id } = req.params;
    const user = await getDB()
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
    if (user) {
        return  res.json({
            success: true,
            data: user,
            message: 'utente trovato con successo'
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
        });
    }
});

// POST /users
usersRouter.post('/', async(req, res) => {
    const newUser = req.body;
    const result = await getDB()
        .collection("users")
        .insertOne(newUser);
    return res.status(201).json({
        success: true,
        data: result,
        message: 'utente aggiunto con successo'
    });
});

// PUT /users/:id
usersRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const user = req.body;
    const result = await getDB()
        .collection("users")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: user }
        );
    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
        });       
    }
    return res.status(200).json({
            success: true,
            data: result,
            message: 'utente aggiornato con successo'
})
});

// DELETE /users/:id
usersRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const result = await getDB()
        .collection("users")
        .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
            data: null
        });
    }
    return res.json({
        success: true,
        data: result,
        message: 'utente eliminato con successo'
    });
});

module.exports = usersRouter;