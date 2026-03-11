import { useEffect, useState } from 'react';
import './Books.css';
import ModBook from "../ModBook/ModBook";
import NewBook from "../NewBook/NewBook";
export default function Books({ token }) {

    const [books, setBooks] = useState([]);

    // effetto collaterale che scatta solo quando 
    // il componente viene montato
    useEffect(() => {
        fetch('http://localhost:3000/api/books', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setBooks(data.data || []));
    }, []);

    return (
        <>
            <div className='section-books'>
                <h2>Tutti i libri</h2>

                <div>
                    {books.map(b => (
                        <p key={b._id}>
                            {b.title}
                        </p>
                    ))}
                </div>
            </div>

            <ModBook books={books} token={token} />
            <NewBook token={token}/>
        </>
    )
}
