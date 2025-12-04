const express = require('express');
const app = express();
const PORT = 3000;
const books = [
  {
    id: 1,
    titolo: "Il Nome della Rosa",
    autore: "Umberto Eco",
    genere: "Giallo storico",
    anno: 1980,
    pagine: 512,
    disponibile: true
  },
  {
    id: 2,
    titolo: "1984",
    autore: "George Orwell",
    genere: "Distopia",
    anno: 1949,
    pagine: 328,
    disponibile: false
  },
  {
    id: 3,
    titolo: "Il Signore degli Anelli",
    autore: "J.R.R. Tolkien",
    genere: "Fantasy",
    anno: 1954,
    pagine: 1216,
    disponibile: true
  },
  {
    id: 4,
    titolo: "Il Piccolo Principe",
    autore: "Antoine de Saint-Exupéry",
    genere: "Favola",
    anno: 1943,
    pagine: 96,
    disponibile: true
  },
  {
    id: 5,
    titolo: "La Solitudine dei Numeri Primi",
    autore: "Paolo Giordano",
    genere: "Narrativa",
    anno: 2008,
    pagine: 272,
    disponibile: false
  }
];

// GET /books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});