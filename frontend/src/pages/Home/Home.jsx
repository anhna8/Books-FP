import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=bestseller')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar libros')
        return res.json()
      })
      .then((data) => setBooks(data.items || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <h1 className="title">Libros destacados</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <ul className="list">
        {books.map((book) => (
          <li key={book.id} className="listItem">
            <Link to={`/book/${book.id}`}>
              {book.volumeInfo.title} — {book.volumeInfo.authors?.join(', ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
