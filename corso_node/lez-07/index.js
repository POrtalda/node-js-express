const express = require('express');
const {connectDB} = require('./db');
const bookRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;


// Middleware to parse JSON bodies
app.use(express.json());
app.use('/books', bookRouter);
app.use('/users', usersRouter);

// Start the server
async function startServer() {
    await connectDB();   // aspetta connessione al database
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();










