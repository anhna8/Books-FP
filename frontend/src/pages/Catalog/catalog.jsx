import { useState } from 'react'
import { Link } from 'react-router-dom'

function Catalog() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      const data = await res.json()
      setBooks(data.items || [])
    } catch (err) {
      setError('Error al buscar libros')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Catálogo de libros</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por título o autor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
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
