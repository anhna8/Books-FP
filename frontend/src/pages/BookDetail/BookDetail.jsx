import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

function BookDetail() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(`https://www.googleapis.com/books/v1/volumes/${id}`)

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>
  if (!data) return <p>No se encontró el libro.</p>

  const book = data.volumeInfo

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Autor:</strong> {book.authors?.join(', ')}</p>
      <p><strong>Descripción:</strong> {book.description}</p>
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
    </div>
  )
}

export default BookDetail
