import { useState } from 'react';

export default function EditSong() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [price, setPrice] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);

    const [selectedSongId, setSelectedSongId] = useState(null);

    function handleEditSong() {
        alert('verrà modificata la canzone (da implementare)');
    }

    function handleRemoveSong() {
        alert('verrà eliminata la canzone (da implementare)');
    }

    function handleChangeSelectSong(e) {
        const songId = e.target.value;
        setSelectedSongId(songId);
    }

    return (
        <>
            <div className="colonne">


                <form>
                    <h2>modifica canzone:</h2>

                    <select onChange={handleChangeSelectSong}>
                        <option value="">seleziona la canzone da modficare</option>
                        <option value="1">canzone 1</option>
                        <option value="2">canzone 2</option>
                        <option value="3">canzone 3</option>
                        <option value="4">canzone 4</option>
                        <option value="5">canzone 5</option>
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
