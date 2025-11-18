import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
});

app.get('/contatti', (req, res) => {
  res.send('<h1>Contatti</h1>');
});

// Gestione 404
app.use((req, res) => {
  res.status(404).send('<h1>Risorsa non trovata</h1>');
});

app.listen(3000, () => {
  console.log('Server in ascolto su http://localhost:3000');
});
