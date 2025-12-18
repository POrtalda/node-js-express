const express = require('express');
const app = express();
const PORT = 3000;

let items = [
    {id: crypto.randomUUID(), title: "TV 50 pollici 1", brand: "Philips", price: 329, description: "TV 50 pollici Philips", isAvaible: true},
    {id: crypto.randomUUID(), title: "Smartphone X", brand: "Samsung", price: 999, description: "Smartphone di ultima generazione", isAvaible: false},
    {id: crypto.randomUUID(), title: "Laptop Pro", brand: "Apple", price: 1999, description: "Laptop per professionisti", isAvaible: true}
];

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
// GET /items
app.get('/items', (req, res) => {
    res.status(200).json({
        success: true,
        data: items,
        message: 'Chiamata GET per tutti gli items riuscita'
    });
});


// GET /items/:id
app.get('/items/:id', (req, res) => {
    const {id} = req.params;
    const item = items.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Item not found',
            data: null
        });
    }
    res.status(200).json({
        success: true,
        data: item,
        message: 'Item found successfully',
        
    });
});

// Post /items
app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = crypto.randomUUID();
    items.push(newItem);
    res.status(201).json({
        success: true,
        data: newItem,
        message: 'New item created successfully'
    });
});

// PUT /items/:id
app.put('/items/:id', (req, res) => {
    const {id} = req.params;
    const item = items.find(item => item.id === id); // item da aggiornare

    if (item) {
        const itemToUpdate = {...item, ...req.body}; // item aggiornato
        items = items.map(i => i.id === id ? itemToUpdate : i); // aggiorno l'array degli items

         res.status(200).json({
            success: true,
            data: items,
            message: 'Item updated successfully'
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: 'item non aggiornabile in quanto non trovato nessun item con questo id',
            data: null
        });
    };
});

// DELETE /items/:id
app.delete('/items/:id', (req, res) => {
    const {id} = req.params;
    const item = items.find(i => i.id === id);

    if(item) {
        items = items.filter(i => i.id !== id); // aggiorno l'array degli items

        return res.status(200).json({
            success: true,
            data: items,
            message: 'Item cancellato correttamente'
        });
        
    }
    
    else{
        return res.status(404).json({
            success: false,
            message: 'Item non eliminabile in quanto non trovato nessun item con questo id',
            data: null
        });
    }
    
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});