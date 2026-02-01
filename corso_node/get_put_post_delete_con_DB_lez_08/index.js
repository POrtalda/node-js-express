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

async function startServer() {
    await connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}

startServer();










// // GET /users
// app.get('/users', (req, res) => {
//     res.json({
//         success: true, 
//         data: users,
//         message: 'questi sono tutti gli utenti'
//     });
// });

