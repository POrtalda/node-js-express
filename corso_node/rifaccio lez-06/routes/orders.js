const express = require('express');
const orderRoutes = express.Router();

let orders = [
    {id: crypto.randomUUID(), bookId: "B001", userId: "U003", quantity: 2, totalPrice: 40},
    {id: crypto.randomUUID(), bookId: "B002", userId: "U001", quantity: 1, totalPrice: 25},
    {id: crypto.randomUUID(), bookId: "B001", userId: "U003", quantity: 3, totalPrice: 90}
];

//API routes

// GET /orders
orderRoutes.get('/', (req, res) => {
    res.json({
        success: true,
        data: orders,
        message: 'questi sono tutti gli ordini'
    });
});

// GET /orders/:id
orderRoutes.get('/:id', (req, res) => {
    const {id} = req.params;
    const order = orders.find(order => order.id === id);
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
            data: null
        });
    }
    res.status(200).json({
        success: true,
        data: order,
        message: 'questo ordine è stato trovato con questo id'
    });
});

// POST /orders
orderRoutes.post('/', (req, res) => {
    const newOrder = req.body;
    newOrder.id = crypto.randomUUID();
    orders.push(newOrder);
    res.status(201).json({
        success: true,
        data: newOrder,
        message: 'nuovo ordine aggiunto con successo'
    });
});

// PUT /orders/:id
orderRoutes.put('/:id', (req, res) => {
    const {id} = req.params;
    const order = orders.find(o => o.id === id);                  // order da aggiornare
    if (order) {
        const orderToUpDate = {...order, ...req.body};               // ordine aggiornato
        orders = orders.map(o => o.id ===id ? orderToUpDate : o);     // aggiorno l'array degli ordini        
        res.status(200).json({                                                 // risposta al client
            success: true,           
            data: orderToUpDate,
            message: 'ordine aggiornato con successo'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
            data: null
        });
    }
})

// DELETE /orders/:id
orderRoutes.delete('/:id', (req, res) => {
    const {id} = req.params;
    const order = orders.find(order => order.id === id);
    if (order) {
            orders = orders.filter(order => order.id !== id);
            res.status(200).json({
                success: true,
                data: orders,
                message: 'ordine eliminato con successo'
            });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun ordine trovato con questo id',
            data: null
        });
    };
});



module.exports = orderRoutes;