import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware per il parsing del corpo delle richieste in formato JSON

app.get('/', (req, res) => res.send('benvenuto nella home page'));
app.use('/users', usersRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});