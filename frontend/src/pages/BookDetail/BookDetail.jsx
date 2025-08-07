import { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import ReviewForm from '../../components/ReviewForm'
import ReviewList from '../../components/ReviewList'
import './BookDetail.css'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
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

  const handleDelete = async () => {
    const confirm = window.confirm('¿Eliminar este libro?')
    if (!confirm) return

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const result = await res.json()
      alert(result.message)
      navigate('/')
    } catch (error) {
      console.error('Error al eliminar el libro:', error)
    }
  }

  if (!token) return <Navigate to="/login" />
  if (loading) return <p>Cargando libro...</p>
  if (!book) return <p>Libro no encontrado.</p>

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} />
      <p>{book.description}</p>

      <button onClick={handleDelete} className="delete-btn">
        🗑️ Eliminar libro
      </button>

      <ReviewForm bookId={book._id} />
      <ReviewList bookId={book._id} />
    </div>
  )
}
