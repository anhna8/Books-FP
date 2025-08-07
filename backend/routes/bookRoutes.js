import express from 'express'
import Book from '../models/books.js'

const router = express.Router()

// 📚 Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error })
  }
})

// 🔍 Obtener detalles de un libro por ID
router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    const book = await Book.findById(bookId)
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' })
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro', error })
  }
})

// 🗑️ Eliminar un libro por ID
router.delete('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    const deletedBook = await Book.findByIdAndDelete(bookId)
    if (!deletedBook) return res.status(404).json({ message: 'Libro no encontrado' })
    res.json({ message: 'Libro eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error })
  }
})

export default router
