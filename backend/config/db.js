import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI no está definida en el archivo .env')
  process.exit(1)
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`📚 MongoDB conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
