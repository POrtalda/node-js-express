import { useState } from 'react';

export default function EditSong({ songs }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [price, setPrice] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);

    const [selectedSongId, setSelectedSongId] = useState(null);

    function handleEditSong() {
        // faccio la chiamata PUT
        fetch(`http://localhost:3000/songs/${selectedSongId}`, {
            method: 'PUT',
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
        alert('canzone modificata');
    
    }

    function handleRemoveSong() {
        // faccio la chiamata DELETE
        fetch(`http://localhost:3000/songs/${selectedSongId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => console.log(data));
        alert('canzone eliminata');
    }

    function handleChangeSelectSong(e) {
        const songId = e.target.value;
        setSelectedSongId(songId);
        // qui faccio fetch di tipo GET/:id per prendere i dati della canzone selezionata
        fetch(`http://localhost:3000/songs/${songId}`)
            .then(res => res.json())
            .then(data => {
                const song = data.data;
                setTitle(song.title);
                setArtist(song.artist);
                setPrice(song.price);
                setIsAvailable(song.isAvailable);
            });
    }

    return (
        <>
            <div className="colonne">


                <form>
                    <h2>modifica canzone:</h2>

                    <select onChange={handleChangeSelectSong}>
                        <option value="">seleziona la canzone da modficare</option>
                        {songs.map(song => (
                            <option key={song.id} value={song.id}>{song.title} - {song.artist}</option>
                        ))}
                    </select>
                    <br /><br />

                    {selectedSongId && (
                        <div>
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
                            <button className='edit' onClick={handleEditSong}>modifica</button>
                            <button className='delete' onClick={handleRemoveSong}>elimina</button>
                        </div>
                    )}

                </form>
            </div>
        </>
    )
}
