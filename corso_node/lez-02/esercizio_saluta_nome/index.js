const express = require('express');
const app = express();
const PORT = 3000;

// get /saluta/:nome
app.get('/saluta/:nome/', (req, res) => {
    const { nome } = req.params;
    res.status(200).send(`Ciao ${nome}!`);
});


app.listen(PORT, () => {
    console.log(`il server è stato avviato sulla porta ${PORT}`)
});