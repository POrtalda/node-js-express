const express = require('express');
const router = express.Router();

const {
  getUsers,
  insertUser,
  getUserById,
  deleteUser,
  updateUser
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', insertUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router;
