

export default function Books({books}) {
return (
    <>
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.year}</p>
                </li>
            ))}
        </ul>
    </>
)
}