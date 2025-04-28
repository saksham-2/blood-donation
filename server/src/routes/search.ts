import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { AppError } from '../middleware/errorHandler'
import { AuthRequest } from '../types/auth'

const router = Router()

const searchSchema = z.object({
  bloodGroup: z.string(),
  location: z.string().optional()
})

// Search for donors
router.get('/donors', async (req: AuthRequest, res, next) => {
  try {
    const { bloodGroup, location } = searchSchema.parse(req.query)

    const donors = await prisma.user.findMany({
      where: {
        role: 'donor',
        bloodGroup,
        ...(location ? { location } : {})
      },
      select: {
        id: true,
        name: true,
        bloodGroup: true,
        location: true,
        phoneNumber: true,
        age: true,
        lastDonation: true
      },
      orderBy: {
        lastDonation: 'asc'
      }
    })

    // Create a request record
    if (req.user) {
      await prisma.request.create({
        data: {
          bloodGroup,
          location: location || null,
          status: 'pending',
          requesterId: req.user.id
        }
      })
    }

    res.json(donors)
  } catch (error) {
    next(error)
  }
})

// Get request history
router.get('/history', async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      throw new AppError(401, 'Unauthorized')
    }

    const requests = await prisma.request.findMany({
      where: {
        requesterId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(requests)
  } catch (error) {
    next(error)
  }
})

export { router as searchRouter } 