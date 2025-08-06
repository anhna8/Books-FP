import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Catalog.css'

function Catalog() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=programming')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar el catálogo')
        return res.json()
      })
      .then((data) => setBooks(data.items || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="catalogContainer">
      <h1 className="catalogTitle">Catálogo de libros</h1>
      {loading && <p>Cargando catálogo...</p>}
      {error && <p>{error}</p>}
      <ul className="catalogList">
        {books.map((book) => (
          <li key={book.id} className="catalogItem">
            <Link to={`/book/${book.id}`}>
              {book.volumeInfo.title} — {book.volumeInfo.authors?.join(', ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Catalog
