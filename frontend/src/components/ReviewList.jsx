import { useEffect, useState } from 'react'
import axios from 'axios'
import './ReviewList.css'

export default function ReviewList({ bookId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${bookId}`)
        setReviews(res.data)
      } catch (err) {
        console.error('Error al cargar reseñas:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [bookId])

  if (loading) return <p>Cargando reseñas...</p>
  if (reviews.length === 0) return <p>No hay reseñas aún.</p>

  return (
    <div className="review-list">
      <h3>Reseñas</h3>
      <div className="review-grid">
        {reviews.map((r) => (
          <div key={r._id} className="review-card">
            {r.book?.image && (
              <img src={r.book.image} alt="Portada" className="review-image" />
            )}
            <div className="review-content">
              <p className="review-stars">{'⭐'.repeat(r.rating)}</p>
              <p className="review-comment">“{r.comment}”</p>
              <p className="review-user">— {r.user?.name || 'Anónimo'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
