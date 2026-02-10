import './Books.css';
export default function Books({books}) {
   
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
