import { PrismaClient } from '@prisma/client'
import { createCities } from './seeds/cities'
import { createStates } from './seeds/states'
import { createOccupationArea } from './seeds/occupationsArea'
const prisma = new PrismaClient()

createStates()
  .then(createCities)
  .then(createOccupationArea)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
