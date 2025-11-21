const express = require('express');
const app = express();
const PORT = 3000;
const movies = [
  {
    id: crypto.randomUUID(),
    title: "Inception",
    duration: 148
  },
  {
    id: crypto.randomUUID(),
    title: "Interstellar",
    duration: 169
  },
  {
    id: crypto.randomUUID(),
    title: "The Dark Knight",
    duration: 152
  },
  {
    id: crypto.randomUUID(),
    title: "Avatar",
    duration: 162
  },
  {
    id: crypto.randomUUID(),
    title: "The Matrix",
    duration: 136
  }
];
const authors = [
  {
    id: crypto.randomUUID(),
    nome: "Mario",
    cognome: "Rossi"
  },
  {
    id: crypto.randomUUID(),
    nome: "Luca",
    cognome: "Bianchi"
  },
  {
    id: crypto.randomUUID(),
    nome: "Giulia",
    cognome: "Verdi"
  },
  {
    id: crypto.randomUUID(),
    nome: "Sara",
    cognome: "Neri"
  },
  {
    id: crypto.randomUUID(),
    nome: "Paolo",
    cognome: "Conti"
  }
];


// GET /api/movies
app.get('/api/movies', (req,res) => {
    res.json(movies)
})

// GET /api/authors
app.get('/api/authors', (req,res) => {
    res.json(authors)
})

// GET /
app.get('/', (req,res) => {
    res.send('Welcome to the Movie API')
})


app.listen(PORT, () => {
    console.log('Swrvere running on http://localhost:' + PORT)

})