import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { AppError } from '../middleware/errorHandler'
import { AuthRequest } from '../types/auth'

const router = Router()

const updateDonorSchema = z.object({
  bloodGroup: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
  age: z.number().optional(),
  lastDonation: z.string().optional().transform((str) => str ? new Date(str) : undefined)
})

// Get donor profile
router.get('/profile', async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      throw new AppError(401, 'Unauthorized')
    }

    const donor = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!donor || donor.role !== 'donor') {
      throw new AppError(404, 'Donor profile not found')
    }

    res.json(donor)
  } catch (error) {
    next(error)
  }
})

// Update donor profile
router.put('/profile', async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      throw new AppError(401, 'Unauthorized')
    }

    const data = updateDonorSchema.parse(req.body)

    const donor = await prisma.user.update({
      where: { id: userId },
      data
    })

    res.json(donor)
  } catch (error) {
    next(error)
  }
})

// Get all donors (with optional filtering)
router.get('/', async (req, res, next) => {
  try {
    const { bloodGroup, location } = req.query

    const donors = await prisma.user.findMany({
      where: {
        role: 'donor',
        ...(bloodGroup ? { bloodGroup: String(bloodGroup) } : {}),
        ...(location ? { location: String(location) } : {})
      },
      select: {
        id: true,
        name: true,
        bloodGroup: true,
        location: true,
        lastDonation: true
      }
    })

    res.json(donors)
  } catch (error) {
    next(error)
  }
})

export { router as donorRouter } 