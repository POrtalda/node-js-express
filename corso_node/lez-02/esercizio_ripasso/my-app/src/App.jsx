import './App.css'
import { useState } from 'react';
import Books from './components/books/Books';
import { useEffect } from 'react';


function App() {
  const [books, setBooks] = useState([
    
  ]);

  useEffect(() => {fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => setBooks(data.data))
      .catch(error => console.error('Error fetching books:', error));
    }, []);
    
 
  

  return (
    <>
      <h1>🚀 Esercizio ripasso react lezione 2</h1>
      <Books books={books} />
    </>
  )
}

export default App
