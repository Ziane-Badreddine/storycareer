import { PrismaClient } from '@/lib/generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Handle connection cleanup on app termination
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

// Handle uncaught errors
process.on('uncaughtException', async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
