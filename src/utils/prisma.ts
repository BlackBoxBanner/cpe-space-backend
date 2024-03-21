import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'pretty',
  })

if (process.env.NODE_ENV != 'production') globalForPrisma.prisma
export default prisma