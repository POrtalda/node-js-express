const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

const books = [
    { id: 1, title: "Il signore degli anelli", author: "Tolkien", year: 1954 },
    { id: 2, title: "Il piccolo principe", author: "Antoine de Saint-Exupéry", year: 1943 },
    { id: 3, title: "La divina commedia", author: "Dante Alighieri", year: 1320 }
];

// queste sono funzioni MIDDLEWARE
// qui abilito cors per tutte le origini
//app.use(cors());
// qui abilito cors solo per questa origine
app.use(cors({ origin: 'http://localhost:5174' }));

// middleware per json
app.use(express.json());

// GET /books
app.get('/books', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

// GEt /books/:id
app.get('/books/:id', (req, res) => {
const {id} = req.params;
const book = books.find(b => b.id === id);
if (book) {
    res.status(200).json({
        success: true,
        data: book
    });
} else {
    res.status(404).json({
        success: false,
        message: 'Book not found'
    });    
}
});

// POST http:/localhost:3000/books
    app.post('/books', (req,res) => {
        const newBook = req.body;   // creo un nuovo libro con i dati del body
        books.push(newBook);         // lo aggiungo all'array dei libri
        res.status(201).json({      // rispondo con lo status 201 Created
            success: true,          // e i dati del nuovo libro
            data: newBook           
        })
    })


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})