import { useEffect, useState } from 'react'
import './App.css'
import Books from './components/books/books'


function App() {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
      setBooks(data.data);
      
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
