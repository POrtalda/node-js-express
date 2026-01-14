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

module.exports = router;