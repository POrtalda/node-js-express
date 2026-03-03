import { useEffect, useState } from 'react';
import './Books.css';
export default function Books({ token }) {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/books', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setBooks(data.data));
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
        </>
    )
}
