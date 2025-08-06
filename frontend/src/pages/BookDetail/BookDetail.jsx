import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ReviewForm from '../../components/ReviewForm'
import ReviewList from '../../components/ReviewList'
import './BookDetail.css'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')

  // Protección de ruta
  if (!token) return <Navigate to="/login" />

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

      {/* Reseñas simuladas (solo visual, no funcional aún) */}
      <h3>Reseñas</h3>
      <p>No hay reseñas aún.</p>

      {/* Formulario de reseña (no guarda nada aún) */}
      <ReviewForm bookId={book.id} />
      <ReviewList bookId={book._id} />
    </div>
  )
}

export default BookDetail
