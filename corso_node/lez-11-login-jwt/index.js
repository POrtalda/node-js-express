require ('dotenv').config();
const express = require('express');
const {connectDB} = require('./db');

const bookRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;


// Middleware to parse JSON bodies
app.use(cors({origin:process.env.URL_CHIAMATE}));
app.use(express.json());
app.use('/api/books', bookRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);


// Start the server
async function startServer() {
    await connectDB();   // aspetta connessione al database
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();










