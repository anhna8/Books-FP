import { useParams } from 'react-router-dom'

function BookDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1>Detalle del libro {id}</h1>
      {/* Aquí irá la info del libro y sus reseñas */}
    </div>
  )
}

export default BookDetail
