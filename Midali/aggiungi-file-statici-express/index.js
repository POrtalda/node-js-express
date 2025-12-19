// come aggiungere file statici in un'applicazione Express

// 1. creare una cartella public/static

// 2. compili il codice con express
const express = require('express');
const app = express();
const PORT = 3000;

// 3. usa il middleware express.static per servire i file statici
app.use(express.static('public'));

// 4. metti il file 'homepage.html' nella cartella 'public'

// 5. faccio chiamata get sendfile per inviare il file html
app.get('/', (req, res) => {
  res.sendFile('homepage.html' , {root: __dirname + '/public'});
});
// 6. avvia il server con node index.js

//SIAMO ARRIVATI AL MINUTO 4:09


app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});