import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

function setupPrisma() {
  return new PrismaClient().$extends(withAccelerate())
}
type ExtendedPrismaClient = ReturnType<typeof setupPrisma>

const globalForPrisma = globalThis as unknown as {
  prisma?: ExtendedPrismaClient
}

export const prisma: ExtendedPrismaClient =
  globalForPrisma.prisma ?? setupPrisma()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
