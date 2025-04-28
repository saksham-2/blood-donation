import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { AppError } from '../middleware/errorHandler'

const router = Router()

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['donor', 'requester']),
  bloodGroup: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
  age: z.number().optional()
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body)
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    })

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '24h' }
    )

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        bloodGroup: user.bloodGroup,
        location: user.location,
        phoneNumber: user.phoneNumber,
        age: user.age
      },
      token
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new AppError(401, 'Invalid email or password')
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw new AppError(401, 'Invalid email or password')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '24h' }
    )

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        bloodGroup: user.bloodGroup,
        location: user.location,
        phoneNumber: user.phoneNumber,
        age: user.age
      },
      token
    })
  } catch (error) {
    next(error)
  }
})

export { router as authRouter } 