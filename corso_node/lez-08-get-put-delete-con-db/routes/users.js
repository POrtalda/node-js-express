const express = require('express');
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const usersRouter = express.Router();

// GET /users
usersRouter.get('/', async (req, res) => {
    const users = await getDB()
        .collection('users')
        .find()
        .toArray();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        data: users,
        message: 'questi sono tutti gli utenti'
    });
});

// GET /users/:id
usersRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID non valido'
        });
    }

    const user = await getDB()
        .collection('users')
        .findOne({ _id: new ObjectId(id) });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        data: user,
        message: 'questo utente è stato trovato con successo'
    });
});

// POST /users
usersRouter.post('/', async (req, res) => {
    const newUser = req.body;

    const result = await getDB()
        .collection('users')
        .insertOne(newUser);
        
    
    
    res.status(201).json({
        success: true,
        data: newUser,
        message: 'nuovo utente aggiunto con successo'
    });
});

// PUT /users/:id
usersRouter.put('/:id', async(req, res) => {
    const {id} = req.params;
    const user = req.body;                  // user da aggiornare, ma sono solo le proprietà che vogliamo aggiornare

    const result = await getDB()
    .collection('users')
    .updateOne(                             //  fai l'update di un ssolo record
        {_id: new ObjectId(id)},            // il record da aggiornare è quello con _id = id   
        {$set: user}                        // sovrascrivi i campi con i valori di user
    );
    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
            data: null
        });        
    }
    return res.status(200).json({
        success: true,
        data: user,
        message: 'utente aggiornato con successo'
    });
})

// DELETE /users/:id
usersRouter.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const result = await getDB()
    .collection('users')
    .deleteOne({_id: new ObjectId(id)});
    if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
            data: null
        });        
    }
    return res.status(200).json({
        success: true,
        message: 'utente eliminato con successo'
    });
});

module.exports = usersRouter;