const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const PORT = 3000;





// Middleware to parse JSON bodies
app.use(express.json());
app.use('/books', bookRoutes); // /books e il prefisso per tutte le chiamate dei libri
app.use('/orders', orderRoutes); // /orders e il prefisso per tutte le chiamate degli ordini
app.use('/users', userRoutes);  // /users e il prefisso per tutte le chiamate degli utenti

// API routes
// GET /books

 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});