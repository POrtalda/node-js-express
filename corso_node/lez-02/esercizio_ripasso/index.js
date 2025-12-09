const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;
const books = [
  {
    id: crypto.randomUUID(),
    titolo: "Il Nome della Rosa",
    autore: "Umberto Eco",
    genere: "Giallo storico",
    anno: 1980,
    pagine: 512,
    disponibile: true
  },
  {
    id: crypto.randomUUID(),
    titolo: "1984",
    autore: "George Orwell",
    genere: "Distopia",
    anno: 1949,
    pagine: 328,
    disponibile: false
  },
  {
    id: crypto.randomUUID(),
    titolo: "Il Signore degli Anelli",
    autore: "J.R.R. Tolkien",
    genere: "Fantasy",
    anno: 1954,
    pagine: 1216,
    disponibile: true
  },
  {
    id: crypto.randomUUID(),
    titolo: "Il Piccolo Principe",
    autore: "Antoine de Saint-Exupéry",
    genere: "Favola",
    anno: 1943,
    pagine: 96,
    disponibile: true
  },
  {
    id: crypto.randomUUID(),
    titolo: "La Solitudine dei Numeri Primi",
    autore: "Paolo Giordano",
    genere: "Narrativa",
    anno: 2008,
    pagine: 272,
    disponibile: false
  }
];

// middleware (funzioni di mezzo)
//abilito il cors per tutte le origini
//app.use(cors());

//abilito il cors solo per l'origine specificata
app.use(cors(
  {origin:'http://localhost:5173'}
))

// middlware per JSON
app.use(express.json());

// metodi API toutes
// GET /books
app.get('/books', (req, res) => {
    res.status(200).json({
      success: true,
      data: books
    });
});
// GET /books/:id
app.get('/books/:id', (req, res) => {
  const {id} = req.params;
  const book = books.find(b => b.id === parseInt(id));
  if (book) {
    res.status(200).json({
      success: true,
      data: book
    });
  } else {
    res.status(404).json({
      success: false,
      data: null,
      message: `Book with id ${id} not found`
    });
  }
});

// POST http://localhost:3000/books
app.post('/books', (req, res) => {
  // creo un nuovo oggetto book da req.body
  const newBook = req.body;
  // assegno un id univoco
  newBook.id = crypto.randomUUID();
  // inserisce il nuovo libro nell'array books
  books.push(newBook);
  // mi restitiusce il libro appena creato
  res.status(201).json({
    success: true,
    data: newBook
  });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});