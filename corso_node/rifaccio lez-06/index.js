const express = require('express');
const app = express();
const PORT = 3000;

let books = [
    {id: crypto.randomUUID(), title: "Book A", author: "Author 1", price: 20, isAvailable: true},
    {id: crypto.randomUUID(), title: "Book B", author: "Author 2", price: 25, isAvailable: false},
    {id: crypto.randomUUID(), title: "Book C", author: "Author 3", price: 30, isAvailable: true}
];

let users = [
    {id: crypto.randomUUID(), name: "User 1", email: "user1@example.com"},
    {id: crypto.randomUUID(), name: "User 2", email: "user2@example.com"},
    {id: crypto.randomUUID(), name: "User 3", email: "user3@example.com"}
];

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
// GET /books
app.get('/books', (req, res) => {
    res.json({
        success: true,
        data: books,
        message: 'questi sono tutti i libri'
    });
});

// GET /books/:id
app.get('/books/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });
    }
    res.status(200).json({
        success: true,
        data: book,
        message: 'questo libro è stato trovato con questo id'
    });
});

// POST /books
app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = crypto.randomUUID();
    books.push(newBook);
    res.status(201).json({
        success: true,
        data: newBook,
        message: 'nuovo libro aggiunto   con successo'
    });
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find(b => b.id === id);                  // book da aggiornare
    if (book) {
        const bookToUpDate = {...book, ...req.body};               // libro aggiornato
        books = books.map(b => b.id ===id ? bookToUpDate : b);     // aggiorno l'array dei libri        
        res.status(200).json({                                                 // risposta al client
            success: true,           
            data: bookToUpDate,
            message: 'libro aggiornato con successo'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });
    }
})

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
    const {id} = req.params;
    const book = books.find(book => book.id === id);
    if (book) {
            books = books.filter(book => book.id !== id);
            res.status(200).json({
                success: true,
                data: books,
                message: 'libro eliminato con successo'
            });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessun libro trovato con questo id',
            data: null
        });
    };
});
 
// get /users
app.get('/users', (req,res) => {
    res.status(200).json({
        success: true,
        data: users,
        message: 'questi sono tutti gli utenti'
    });
});