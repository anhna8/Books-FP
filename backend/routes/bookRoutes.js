import express from 'express'
const router = express.Router()

// Ruta GET para /api/books
router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Orgullo y prejuicio',
      author: 'Jane Austen',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Cumbres borrascosas',
      author: 'Emily Brontë',
      rating: 4.6
    },
  ])
})

export default router
