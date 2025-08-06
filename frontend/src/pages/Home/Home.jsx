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
      <div className="book-grid">
        {books.map((book) => {
          const info = book.volumeInfo
          const image = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195?text=Sin+imagen'
          const title = info.title || 'Sin título'
          const author = info.authors?.join(', ') || 'Autor desconocido'
          const rating = Math.floor(info.averageRating || 0)

          return (
            <div key={book.id} className="book-card">
              <Link to={`/book/${book.id}`}>
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>{author}</p>
                <p className="stars">
                  {rating > 0 ? '⭐'.repeat(rating) : 'Sin calificación'}
                </p>
              </Link>
              <button>Quiero leerlo</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
