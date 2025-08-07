import fs from 'fs'
import path from 'path'
import { bookSchema } from '../schemas/bookSchema.js'

const booksPath = path.resolve('data', 'books.json')

// GET /api/books
export const getBooks = (req, res) => {
  fs.readFile(booksPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error al leer los libros' })
    const books = JSON.parse(data)
    res.status(200).json(books)
  })
}

// GET /api/books/:id
export const getBookById = (req, res) => {
  const bookId = parseInt(req.params.id)
  fs.readFile(booksPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error al leer los libros' })
    const books = JSON.parse(data)
    const book = books.find(b => b.id === bookId)
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' })
    res.status(200).json(book)
  })
}

// POST /api/books
export const createBook = (req, res) => {
  const { error } = bookSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  fs.readFile(booksPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error al leer los libros' })
    const books = JSON.parse(data)
    const newBook = { id: books.length + 1, ...req.body }
    books.push(newBook)

    fs.writeFile(booksPath, JSON.stringify(books, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Error al guardar el libro' })
      res.status(201).json(newBook)
    })
  })
}

// DELETE /api/books/:id
export const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id)
  fs.readFile(booksPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error al leer los libros' })
    let books = JSON.parse(data)
    const index = books.findIndex(b => b.id === bookId)
    if (index === -1) return res.status(404).json({ message: 'Libro no encontrado' })

    books.splice(index, 1)

    fs.writeFile(booksPath, JSON.stringify(books, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Error al eliminar el libro' })
      res.status(200).json({ message: 'Libro eliminado con éxito' })
    })
  })
}
