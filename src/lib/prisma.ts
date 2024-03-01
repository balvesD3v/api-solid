import { zodEnv } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: zodEnv.NODE_ENV === 'dev' ? ['query'] : [],
})
