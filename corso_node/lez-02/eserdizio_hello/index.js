const express = require('express');
const app = express();
const PORT = 3000;
const message = "Hello, world!";

// GET /hello
app.get('/hello', (req, res) => {
    res.json({ message });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});