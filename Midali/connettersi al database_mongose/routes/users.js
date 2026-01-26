const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let users = [
    { id: crypto.randomUUID(), name: 'Alice' },
    { id: crypto.randomUUID(), name: 'Bob' },
    { id: crypto.randomUUID(), name: 'Charlie' }
];
// Get all users
router.get('/', (req, res) => {
  res.send(users);
});

// POST a new user
router.post('/', (req, res) => {
  console.log(req.body);
  const id = uuidv4();
  const newUser = { id, ...req.body };
  users.push(newUser);
  res.send('utente aggiunto con successo');
});

// GET a user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.send('utente eliminato con successo');
});

// PATCH a user by ID
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const {name} = req.body;
  const userTovato = users.find(u => u.id === id);
  if (userTovato) {
    users = users.map(u => u.id === id ? { ...u, name } : u);
    res.status(200).send('utente aggiornato con successo');
  } else {
    res.status(404).send('User not found');
  }
});


module.exports = router;