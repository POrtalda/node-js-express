const { v4: uuidv4 } = require('uuid');

let users = [
  { id: uuidv4(), name: 'Alice' },
  { id: uuidv4(), name: 'Bob' },
  { id: uuidv4(), name: 'Charlie' }
];

const getUsers = (req, res) => {
  res.json(users);
};

const insertUser = (req, res) => {
  const newUser = {
    id: uuidv4(),
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

const getUserById = (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  user
    ? res.json(user)
    : res.status(404).send('User not found');
};

const deleteUser = (req, res) => {
  users = users.filter(u => u.id !== req.params.id);
  res.send('utente eliminato con successo');
};

const updateUser = (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).send('User not found');

  user.name = req.body.name;
  res.send('utente aggiornato con successo');
};

module.exports = {
  getUsers,
  insertUser,
  getUserById,
  deleteUser,
  updateUser
};
