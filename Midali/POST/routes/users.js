const express = require('express');
const router = express.Router();

let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  console.log(req.body);
  const newUser = req.body;
  users.push(newUser);
  res.send('utente aggiunto con successo');
});

module.exports = router;