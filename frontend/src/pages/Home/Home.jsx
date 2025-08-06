import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=best+books')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar libros')
        return res.json()
      })
      .then((data) => setBooks(data.items || []))
      .catch((err) => setError(err.message))
