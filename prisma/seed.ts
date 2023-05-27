import { PrismaClient } from '@prisma/client'
import { createCities } from './seeds/cities'
import { createStates } from './seeds/states'
import { createOccupationArea } from './seeds/occupationsArea'
import { createOrganizationType } from './seeds/organizationType'
const prisma = new PrismaClient()

createOrganizationType()
  // createStates()
  //   .then(createCities)
  //   .then(createOccupationArea)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
