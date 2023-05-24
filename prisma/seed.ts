import { PrismaClient } from '@prisma/client'
import { createCities } from './seeds/cities'
import { createStates } from './seeds/states'
const prisma = new PrismaClient()

createStates()
  .then(createCities)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
