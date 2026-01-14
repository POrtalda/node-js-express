const express = require('express');
const usersRouter = require('./routes/users');
const app = express();
const PORT = 3000;



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});