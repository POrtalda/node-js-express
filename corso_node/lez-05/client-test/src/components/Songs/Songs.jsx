export default function Songs({ songs }) {
    return (
        <>
            <div className='colonne'>
                <h2>elenco canzoni:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>titolo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map(song => (
                            <tr key={song.id}>
                                <td>{song.title} - {song.artist}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
