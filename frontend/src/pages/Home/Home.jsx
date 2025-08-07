import { useEffect, useState } from 'react'
import './Home.css' // Asegúrate de tener estilos cozy aquí

const Home = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error al cargar libros:', err))
  }, [])

  return (
    <div className="home-container">
      <h2 className="home-title">📚 Biblioteca Cozy</h2>
      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-cover">
              {/* Si tienes imagen, úsala aquí */}
              <img src={book.cover || '/default-cover.jpg'} alt={book.title} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">por {book.author}</p>
              <p className="rating">⭐ {book.rating}</p>
              {book.review && <p className="review">“{book.review}”</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
