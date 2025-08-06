import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ReviewList({ bookId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${bookId}`);
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
    <div>
      <h3>Reseñas</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r._id}>
            <strong>{r.rating}⭐</strong> — {r.comment}
          </li>
        ))}
      </ul>
    </div>
  )
}
