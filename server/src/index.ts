import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth'
import { donorRouter } from './routes/donors'
import { searchRouter } from './routes/search'
import { errorHandler } from './middleware/errorHandler'
import { authenticateToken } from './middleware/auth'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3000
const prisma = new PrismaClient()

// Test database connection
prisma.$connect()
  .then(() => {
    console.log('✨ Successfully connected to PostgreSQL database')
  })
  .catch((error) => {
    console.error('❌ Error connecting to database:', error)
  })

// Configure CORS to accept requests from any origin during development
app.use(cors({
  origin: true, // Allow all origins
  credentials: true // Allow credentials
}))
app.use(express.json())

// Public routes
app.use('/api/auth', authRouter)

// Protected routes
app.use('/api/donors', authenticateToken, donorRouter)
app.use('/api/search', authenticateToken, searchRouter)

// Error handling
app.use(errorHandler)

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${port}`)
  console.log(`📡 Server is accessible at http://localhost:${port} and http://${require('os').networkInterfaces()['Wi-Fi']?.[1]?.address || 'YOUR_IP'}:${port}`)
}) 