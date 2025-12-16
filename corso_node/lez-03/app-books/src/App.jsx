import { useEffect, useState } from 'react'
import './App.css'
import Books from './components/books/books'


function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "Il signore degli anelli", author: "Tolkien", year: 1954 },
    { id: 2, title: "Il piccolo principe", author: "Antoine de Saint-Exupéry", year: 1943 },
    { id: 3, title: "La divina commedia", author: "Dante Alighieri", year: 1320 } 
  ])

  useEffect(() => {
    fetch('')
    .then(res => res.json())
    .then(data => {
      setBooks(data);
      console.log(data)
    })
    
  }, [])

  return (
    <>
      <h1>📚 Elenco Libri</h1  >
      <Books books={books} />
    </>
  )
}

export default App
