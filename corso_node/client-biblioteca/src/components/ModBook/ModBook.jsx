import './ModBook.css';
import { useState } from "react";
import { useEffect } from "react";

export default function ModBook({ books }) {


    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        if (selectedBookId) {
            fetch(`http://localhost:3000/api/books/${selectedBookId}`)
                .then(res => res.json())
                .then(data => {
                    const book = data.data;
                    setTitle(book.title);
                    setAuthor(book.author);
                    setIsAvailable(book.is_available);
                });
        }
    }, [selectedBookId]);

    function onSelectBook(e) {
        setSelectedBookId(e.target.value);
    }

    function clickSave() {
        // da implementare chiamando la put per aggiornare il libro con id
        fetch(`http://localhost:3000/api/books/${selectedBookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                author: author,
                is_available: isAvailable
            })
        })
        .then(res => res.json())
        .then(data => {
            alert('libro aggiornato con successo');
            location.reload();   // ricarica la pagina per vedere i cambiamenti (da migliorare)
        })
    }

    function clickDelete() {
        fetch(`http://localhost:3000/api/books/${selectedBookId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert('libro eliminato con successo');
            location.reload();   // ricarica la pagina per vedere i cambiamenti (da migliorare)
        })
    }

    return (
        <>
            <div className='section-details'>

                <div>
                    <h3>Dettagli libro:</h3>
                    <select onChange={onSelectBook}>
                        <option value="">seleziona un libro...</option>
                        {books.map(b => (
                            <option key={b._id} value={b._id}>{b.title}</option>
                        ))}
                    </select>
                </div>
                {selectedBookId && (

                    <div>
                        <label>Titolo:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label> <br />
                        <label>Autore:
                            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </label> <br />
                        <label>Disponibile:
                            <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                        </label> <br />
                        <button onClick={clickSave}>salva</button>
                        <button onClick={clickDelete}>elimina</button>
                    </div>
                )}
            </div>

        </>
    )
}
