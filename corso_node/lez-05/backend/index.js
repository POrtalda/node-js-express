const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;


let songs = [
    {id: crypto.randomUUID(), title: "Song A", artist: "Artist 1", price: 65, isAvailable: true},
    {id: crypto.randomUUID(), title: "Song B", artist: "Artist 2", price: 70, isAvailable: false},
    {id: crypto.randomUUID(), title: "Song C", artist: "Artist 3", price: 75, isAvailable: true}
];

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // indirizzo del client Vite
}));

// API routes
// GET /songs
app.get('/songs', (req, res) => {
    res.json({
        success: true,
        data: songs,
        message: 'queste sono tutte le canzoni'
    });
});

// GET /songs/:id
app.get('/songs/:id', (req, res) => {
    const {id} = req.params;
    const song = songs.find(song => song.id === id);
    if (!song) {
        return res.status(404).json({
            success: false,
            message: 'nessuna canzone trovata con questo id',
            data: null
        });
    }
    res.status(200).json({
        success: true,
        data: song,
        message: 'questa canzone è stata trovata con questo id'
    });
});

// POST /songs
app.post('/songs', (req, res) => {
    const newSong = req.body;
    newSong.id = crypto.randomUUID();
    songs.push(newSong);
    res.status(201).json({
        success: true,
        data: newSong,
        message: 'nuova canzone aggiunta con successo'
    });
});

// PUT /songs/:id
app.put('/songs/:id', (req, res) => {
    const {id} = req.params;
    const song = songs.find(s => s.id === id);                  // song da aggiornare
    if (song) {
        const songToUpDate = {...song, ...req.body};               // canzone aggoirnata
        songs = songs.map(s => s.id ===id ? songToUpDate : s);     // aggiorno l'array delle canzoni
        res.status(200).json({                                                 // risposta al client
            success: true,           
            data: songToUpDate,
            message: 'canzone aggiornata con successo'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessuna canzone trovata con questo id',
            data: null
        });
    }
})

// DELETE /songs/:id
app.delete('/songs/:id', (req, res) => {
    const {id} = req.params;
    const song = songs.find(song => song.id === id);
    if (song) {
            songs = songs.filter(song => song.id !== id);
            res.status(200).json({
                success: true,
                data: songs,
                message: 'canzone eliminata con successo'
            });
    } else {
        res.status(404).json({
            success: false,
            message: 'nessuna canzone trovata con questo id',
            data: null
        });
    };
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});