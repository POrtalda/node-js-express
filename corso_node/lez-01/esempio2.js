// importo la libreria express
const express = require('express'); 

// creo l'applicazione express
const app = express();  

// numero della porta su cuii il server sarà in ascolto
const PORT = 3000;

// definisco tutte le API

// GET http://localhost:3000/
app.get('/', (req, res) => {
res.send('home del mio server node')
});

// GET http://localhost:3000/about
app.get('/about', (req, res) => {
    res.send('ABOUT PAGE')
})

// GET http://localhost:3000/api/persone
app.get('/api/persone', (req, res) => {
    res.json(
        [
            {id: 1,
             nome: 'mario'
            },
            {
                id: 2,
                nome: 'luigi'
            }
        ]
    )
})

// metto in ascolto l'applicaziione
// primo argomento: porta in ascolto
//secondo argomento: funzione che viene eseguita quando il server parte è in ascolto
app.listen(PORT, () => {
    console.log('server in ascolto sulla porta ' + PORT)
});
