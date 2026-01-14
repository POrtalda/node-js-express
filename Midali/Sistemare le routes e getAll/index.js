const express = require('express');
const usersRouter = require('./routes/users');
const app = express();
const port = 3000;


// GET homepage
app.use('/users', usersRouter);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});