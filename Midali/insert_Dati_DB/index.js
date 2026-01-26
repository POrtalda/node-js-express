const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_DB_URL = 'mongodb://localhost:27017/mydb'; // metti il nome del DB

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter);

// Connessione a MongoDB + avvio server
mongoose
  .connect(CONNECTION_DB_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to the database:', error);
  });
