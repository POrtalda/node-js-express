import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import Books from './components/Books/Books';
import NewBook from './components/NewBook/NewBook';
import ModBook from './components/ModBook/ModBook';

function App() {
  const [books, setBooks] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data.data));
  }, []);

  return (
    <>
      <Books books={books} />
      <ModBook books={books} />
      <NewBook />
    </>
  )
}

export default App
