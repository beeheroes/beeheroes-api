import { PrismaClient, State } from '@prisma/client'
const prisma = new PrismaClient()

export async function createOrganizationType() {
  await prisma.$queryRaw<State[]>`
    INSERT INTO organization_types (id, title) VALUES (1, 'Assistência social'), (2, 'Cultura'), (3, 'Desenvolvimento e defesa de direitos'),  (4, 'Educação e Pesquisa'), (5, 'Habitação'),(6, 'Meio ambiente'), (7, 'Proteção de animais'), (8, 'Saúde'),    (9, 'Outro');
  `
}
