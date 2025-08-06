import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ReviewForm from '../../components/ReviewForm'
import ReviewList from '../../components/ReviewList'
import './BookDetail.css'

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`)
        const data = await res.json()
        setBook(data)
      } catch (err) {
        console.error("Error al cargar libro:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  if (!token) return <Navigate to="/login" />
  if (loading) return <p>Cargando libro...</p>
  if (!book) return <p>Libro no encontrado.</p>

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} />
      <p>{book.description}</p>

      <ReviewForm bookId={book._id} />
      <ReviewList bookId={book._id} />
    </div>
  )
}
