import { useState } from "react";

export default function NewSong() {

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [price, setPrice] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);

    function handleAddSong() {
        // alert('verrà aggiunta la canzone (da implementare)');
        // faccio la fetch alla chiamata post        
        fetch('http://localhost:3000/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                artist: artist,
                price: parseFloat(price),
                isAvailable: isAvailable
            })
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    return (
        <>
            <div className="colonne">
                <form>
                    <h2>nuova canzone:</h2>
                    <label>
                        titolo: <br />
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label>
                        artista: <br />
                        <input type="text" name="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
                    </label>
                    <label>
                        prezzo ($): <br />
                        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label>
                        disponibilità: <br />
                        <input type="checkbox" name="isAvailable" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                    </label>
                    <button className="add" onClick={handleAddSong}>crea</button>
                </form>
            </div>
        </>
    )
}
