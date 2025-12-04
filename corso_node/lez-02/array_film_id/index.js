const express = require('express');
const app = express();
const PORT = 3000;
const movies = [
    {
    id: 1,
    titolo: "Inception",
    durata: 148
  },
  {
    id: 2,
    titolo: "Interstellar",
    durata: 169
  },
  {
    id: 3,
    titolo: "The Dark Knight",
    durata: 152
  },
  {
    id: 4,
    titolo: "Pulp Fiction",
    durata: 154
  },
  {
    id: 5,
    titolo: "Forrest Gump",
    durata: 142
  }
]

// get /movies/:id
app.get('/movies/:id/', (req, res) => {
    const {id} = req.params;
    const movie = movies.find(movie => movie.id === id)
    if(movie) {
        res.status(200).json(movie);
    }
    else {
        const message = {success: false, message: `il film con id ${id} non è stato trovato`}
        res.status(404).json(message);
      }
});

app.listen(PORT, () => {
    console.log(`il server è stato avviato sulla porta ${PORT}`)
})