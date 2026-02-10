import './NewBook.css';
import { useState } from "react";

export default function NewBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);

    function clickCreate() {
        fetch('http://localhost:3000/api/books', {
            method: 'POST',
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
            alert('libro creato con successo');
            location.reload();   // ricarica la pagina per vedere i cambiamenti (da migliorare)
        })
    }

    return (
        <>
            <div className="section-new">
                <h3>Nuovo libro:</h3>
                <label>Titolo:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label> <br />
                <label>Autore:
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label> <br />
                <label>Disponibile:
                    <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                </label> <br />
                <button onClick={clickCreate}>crea</button>
            </div>
            
        </>
    )
}
