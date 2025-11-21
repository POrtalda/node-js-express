const express = require('express'); 
const app = express();
const PORT = 3000;

const books = [
    {
        id: crypto.randomUUID(),
        title: 'Il nome della rosa',
        pages: 400
    },
    {
        id: crypto.randomUUID(),
        title: 'Il signore degli anelli',
        pages: 1200
    },
    {
        id: crypto.randomUUID(),
        title: 'Harry Potter e la pietra filosofale',
        pages: 350
    }
]

// routes API

// GET http://localhost:3000/
app.get('/', (req, res) => {
    res.send('home page')
})

// GET http://localhost:3000/info
app.get('/info', (req, res) => {
    res.send('pagina info')
})

// GET http://localhost:3000/api/books
app.get('/api/books', (req, res) => {
    res.json(books)
})


app.listen(PORT, () => {
    console.log('server in ascolto sulla porta ' + PORT)
});


// ESERCIZIO: 
// crea un progetto node con exppress
// il server sarà in ascolto sulla porta 3000
// le routes API saranno:
// GET /api/movies restituisce un array di oggetti movie (id, titolo, durata)
