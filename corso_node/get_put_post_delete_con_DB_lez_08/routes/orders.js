const express = require('express');
const { getDB } = require('../db');
const {objectId, ObjectId} = require('mongodb');
const ordersRouter = express.Router();



// API routes
// GET /orders
ordersRouter.get('/', async (req, res) => {
    const orders = await getDB()
        .collection("orders")
        .find()
        .toArray();

    if (orders.length > 0) {
        return res.json({
            success: true,
            data: orders,
            message: 'questi sono tutti gli ordini'
        });
    }
    else {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato',
        });
    }
});

// GET /orders/:id
ordersRouter.get('/:id', async(req, res) => {
    const { id } = req.params;
    const order = await getDB()
        .collection("orders")
        .findOne({ _id: new ObjectId(id) });
    if (order  ) {
        return  res.json({
            success: true,
            data: order,
            message: 'ordine trovato con successo'
        });
    } else {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
        });
    }
});

// POST /orders
ordersRouter.post('/', async(req, res) => {
    const newOrder = req.body;
    const result = await getDB()
        .collection("orders")
        .insertOne(newOrder);
    return res.status(201).json({
        success: true,
        data: result,
        message: 'ordine aggiunto con successo'
    });
});

// PUT /orders/:id
ordersRouter.put('/:id', async (req, res) => {
    const {id} = req.params;
    const order = req.body;
    const result = await getDB()
        .collection("orders")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: order }
        );
    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
        });       
    }
    return res.status(200).json({
            success: true,
            data: result,
            message: 'ordine aggiornato con successo'
})
});

// DELETE /orders/:id
ordersRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const result = await getDB()
        .collection("orders")
        .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
            data: null
        });
    }
    return res.json({
        success: true,
        data: result,
        message: 'ordine eliminato con successo'
    });
});

module.exports = ordersRouter;