import { useState } from 'react'
import axios from 'axios'
import './ReviewForm.css'

export default function ReviewForm({ bookId }) {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const token = localStorage.getItem('token')

  if (!token) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/reviews', { bookId, comment, rating }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComment('')
      setRating(5)
    } catch (err) {
      console.error('Error al enviar reseña:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Escribe tu reseña"
        required
      />
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n} estrellas</option>
        ))}
      </select>
      <button type="submit">Enviar reseña</button>
    </form>
  )
}