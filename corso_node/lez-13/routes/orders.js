const express = require('express');
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const orderRouter = express.Router();


// GET /orders
orderRouter.get('/', async (req, res) => {
    const orders = await getDB()
        .collection('orders')
        .find()
        .toArray();

    if (orders.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        data: orders,
        message: 'questi sono tutti gli ordini'
    });
});

// GET /orders/:id
orderRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID non valido'
        });
    }

    const order = await getDB()
        .collection('orders')
        .findOne({ _id: new ObjectId(id) });

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        data: order,
        message: 'questo ordine è stato trovato con successo'
    });
});

// POST /orders
orderRouter.post('/', async (req, res) => {
    const newOrder = req.body;

    const result = await getDB()
        .collection('orders')
        .insertOne(newOrder);
        
    
    
    res.status(201).json({
        success: true,
        data: newOrder,
        message: 'nuovo ordine aggiunto con successo'
    });
});

// PUT /orders/:id
orderRouter.put('/:id', async(req, res) => {
    const {id} = req.params;
    const order = req.body;                  // order da aggiornare, ma sono solo le proprietà che vogliamo aggiornare

    const result = await getDB()
    .collection('orders')
    .updateOne(                             //  fai l'update di un ssolo record
        {_id: new ObjectId(id)},            // il record da aggiornare è quello con _id = id   
        {$set: order}                        // sovrascrivi i campi con i valori di order
    );
    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
            data: null
        });        
    }
    return res.status(200).json({
        success: true,
        data: order,
        message: 'ordine aggiornato con successo'
    });
})

// DELETE /orders/:id
orderRouter.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const result = await getDB()
    .collection('orders')
    .deleteOne({_id: new ObjectId(id)});
    if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
            data: null
        });        
    }
    return res.status(200).json({
        success: true,
        message: 'ordine eliminato con successo'
    });
});

module.exports = orderRouter;