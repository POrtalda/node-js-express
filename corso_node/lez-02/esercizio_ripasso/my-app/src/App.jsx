import './App.css'
import { useState } from 'react';
import Books from './components/books/Books';


function App() {
  const [books, setBooks] = useState([
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
  ]);
  

  return (
    <>
      <h1>🚀 Esercizio ripasso react lezione 2</h1>
      <Books books={books} />
    </>
  )
}

export default App
