import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  rating: Number,
  googleId: String
})

export default mongoose.model('Book', bookSchema)
