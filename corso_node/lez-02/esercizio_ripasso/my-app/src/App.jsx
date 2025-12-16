import './App.css'
import { useState } from 'react';
import Books from './components/books/Books';
import { useEffect } from 'react';


function App() {
  const [books, setBooks] = useState([
    
  ]);
<<<<<<< HEAD
  useEffect(() => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
      setBooks(data)});
  }, []);
=======

  useEffect(() => {fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => setBooks(data.data))
      .catch(error => console.error('Error fetching books:', error));
    }, []);
    
 
>>>>>>> 5cdc5ab4969a41295847b9f274ec746e895a8436
  

  return (
    <>
      <h1>🚀 Esercizio ripasso react lezione 2</h1>
      <Books books={books} />
    </>
  )
}

export default App
