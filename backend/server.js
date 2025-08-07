import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/bookRoutes.js'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (req, res) => {
  res.json({
    message: 'API de Books Cozy',
    endpoints: {
      getBooks: 'GET /api/books',
      getBook: 'GET /api/books/:id',
      createBook: 'POST /api/books',
      deleteBook: 'DELETE /api/books/:id'
    }
  })
})

app.use('/api/books', bookRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint no encontrado',
    error: `La ruta ${req.originalUrl} no existe`
  })
})

connectDB()

app.listen(port, () => {
  console.log(`Servidor cozy corriendo en puerto ${port} 📚`)
})
