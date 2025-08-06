import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './BookDetail.css'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar el libro')
        return res.json()
      })
      .then((data) => setBook(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Cargando libro...</p>
  if (error) return <p>{error}</p>
  if (!book) return <p>No se encontró el libro</p>

  const info = book.volumeInfo

  return (
    <div className="bookDetailContainer">
      <h1 className="bookTitle">{info.title}</h1>
      <p className="bookAuthor">Autor(es): {info.authors?.join(', ')}</p>
      <p className="bookDescription">{info.description || 'Sin descripción disponible.'}</p>
      {info.imageLinks?.thumbnail && (
        <img src={info.imageLinks.thumbnail} alt={info.title} className="bookImage" />
      )}
    </div>
  )
}

export default BookDetail
