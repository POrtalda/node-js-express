const express = require('express');
const userRoutes = express.Router();

let users = [
    {id: "U001", name: "User 1", email: "user1@example.com"},
    {id: "U002", name: "User 2", email: "user2@example.com"},
    {id: "U003", name: "User 3", email: "user3@example.com"}
];

// get /users
userRoutes.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        data: users,
        message: 'questi sono tutti gli utenti'
    });
});

// GET /users/:id
userRoutes.get('/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
            data: null
        });
    }
    res.status(200).json({
        success: true,
        data: user,
        message: 'questo utente è stato trovato con questo id'
    });
});

// POST /users
userRoutes.post('/', (req, res) => {
    const newUser = req.body;
    newUser.id = crypto.randomUUID();
    users.push(newUser);
    res.status(201).json({
        success: true,
        data: newUser,
        message: 'nuovo utente aggiunto con successo'
    });
});

// PUT /users/:id
userRoutes.put('/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find(u => u.id === id);                  // user da aggiornare
    if (user) {
        const userToUpDate = {...user, ...req.body};               // utente aggiornato
        users = users.map(u => u.id ===id ? userToUpDate : u);     // aggiorno l'array degli utenti        
        res.status(200).json({                                                 // risposta al client
            success: true,           
            data: userToUpDate,
            message: 'utente aggiornato con successo'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
            data: null
        });
    }
})

// DELETE /users/:id
userRoutes.delete('/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find(user => user.id === id);
    if (user) {
            users = users.filter(user => user.id !== id);
            res.status(200).json({
                success: true,
                data: users,
                message: 'utente eliminato con successo'
            });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun utente trovato con questo id',
            data: null
        });
    };
});

module.exports = userRoutes;