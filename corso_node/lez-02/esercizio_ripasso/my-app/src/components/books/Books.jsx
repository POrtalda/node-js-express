import './Book.css';

export default function Books({books}) {
    return (
      <>
        <ul>
            {books.map(b => (
              <li key={b.id}> {b.titolo}</li>
            ))}
        </ul>
      </>  
    )}