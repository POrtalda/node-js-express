import './Books.css';

export default function Books({books}) {
return (
    <>
        {books.length > 0 && (
            <ul>            
            {books.map(book => (
                <li key={book.id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.year}</p>
                </li>
            ))}
        </ul>
        )}
        
    </>
)
}