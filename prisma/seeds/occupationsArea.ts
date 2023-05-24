import { PrismaClient, State } from '@prisma/client'
const prisma = new PrismaClient()

export async function createOccupationArea() {
  await prisma.$queryRaw<State[]>`
    INSERT INTO occupations_area (id, title) VALUES (1, 'Administrador'), (2, 'Administrador público'), (3, 'Advogado'), (4, 'Agricultor'), (5, 'Agrônomo'), (6, 'Agropecuarista'), (7, 'Analista e desenvolvedor de sistemas'), (8, 'Animador'), (9, 'Arqueólogo'), (10, 'Arquiteto'), (11, 'Arquivologista'), (12, 'Artista plástico'), (13, 'Astrônomo'), (14, 'Ator'), (15, 'Biblioteconomista'), (16, 'Biomédico'), (17, 'Bioquímico'), (18, 'Biotecnólogo'), (19, 'Chef'), (20, 'Cientista da computação'), (21, 'Construtor civil'), (22, 'Construtor naval'), (23, 'Contabilista'), (24, 'Cooperativista'), (25, 'Dançarino'), (26, 'Dentista'), (27, 'Designer'), (28, 'Designer de games'), (29, 'Designer de interiores'), (30, 'Designer de moda'), (31, 'Ecologista'), (32, 'Economista'), (33, 'Educador físico'), (34, 'Educomunicador'), (35, 'Enfermeiro'), (36, 'Engenheiro acústico'), (37, 'Engenheiro aeronáutico'), (38, 'Engenheiro agrícola'), (39, 'Engenheiro ambiental e sanitário'), (40, 'Engenheiro biomédico'), (41, 'Engenheiro civil'), (42, 'Engenheiro da computação'), (43, 'Engenheiro de alimentos'), (44, 'Engenheiro de biossistemas'), (45, 'Engenheiro de controle e automação'), (46, 'Engenheiro de energia'), (47, 'Engenheiro de inovação'), (48, 'Engenheiro de materiais'), (49, 'Engenheiro de minas'), (50, 'Engenheiro de pesca'), (51, 'Engenheiro de petróleo'), (52, 'Engenheiro de produção'), (53, 'Engenheiro de segurança do trabalho'), (54, 'Engenheiro de sistemas'), (55, 'Engenheiro de software'), (56, 'Engenheiro de telecomunicações'), (57, 'Engenheiro de transporte e mobilidade'), (58, 'Engenheiro elétrico'), (59, 'Engenheiro eletrônico'), (60, 'Engenheiro físico'), (61, 'Engenheiro florestal'), (62, 'Engenheiro hídrico'), (63, 'Engenheiro mecânico'), (64, 'Engenheiro mecatrônico'), (65, 'Engenheiro naval'), (66, 'Engenheiro químico'), (67, 'Especialista em comércio exterior'), (68, 'Estatístico'), (69, 'Esteticista'), (70, 'Farmacêutico'), (71, 'Filósofo'), (72, 'Físico'), (73, 'Fisioterapeuta'), (74, 'Fonoaudiólogo'), (75, 'Fotógrafo'), (76, 'Geofísico'), (77, 'Geógrafo'), (78, 'Geólogo'), (79, 'Gerente comercial'), (80, 'Gerontólogo'), (81, 'Gestor ambiental'), (82, 'Gestor da qualidade'), (83, 'Gestor da tecnologia da informação'), (84, 'Gestor de recursos humanos'), (85, 'Gestor de turismo'), (86, 'Gestor em saúde'), (87, 'Gestor hospitalar'), (88, 'Gestor público'), (89, 'Historiador'), (90, 'Historiador da arte'), (91, 'Hoteleiro'), (92, 'Jornalista'), (93, 'Linguista'), (94, 'Matemático'), (95, 'Médico'), (96, 'Meteorologista'), (97, 'Minerador'), (98, 'Museologista'), (99, 'Músico'), (100, 'Musicoterapeuta'), (101, 'Nanotecnólogo'), (102, 'Nutricionista'), (103, 'Oceanógrafo'), (104, 'Outro'), (105, 'Pedagogo'), (106, 'Piloto de avião'), (107, 'Produtor audiovisual'), (108, 'Produtor cênico'), (109, 'Produtor cultural'), (110, 'Produtor editorial'), (111, 'Produtor fonográfico'), (112, 'Produtor multimídia'), (113, 'Produtor publicitário'), (114, 'Professor'), (115, 'Psicólogo'), (116, 'Psicopedagogo'), (117, 'Publicitário'), (118, 'Químico'), (119, 'Radialista'), (120, 'Radiologista'), (121, 'Relações internacionais'), (122, 'Relações públicas'), (123, 'Secretária'), (124, 'Secretária executiva'), (125, 'Silvicultor'), (126, 'Sociólogo'), (127, 'Teólogo'), (128, 'Terapeuta ocupacional'), (129, 'Tradutor e intérprete'), (130, 'Turismólogo'), (131, 'Veterinário'), (132, 'Zootecnólogo');
  `
}