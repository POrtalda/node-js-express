import express from 'express';

import {getUserByID, insertUser, getAllUsers, deleteUser, updateUser} from '../controllers/users.js';

const router = express.Router();

// GET /users
router.get('/', getAllUsers);

// POST /users
router.post('/', insertUser);

// GET /users/:id
router.get('/:id', getUserByID);

// DELETE /users/:id
router.delete('/:id', deleteUser);

// PATCH /users/:id - aggiornamento parziale di un utente
router.patch('/:id', updateUser);



export default router;