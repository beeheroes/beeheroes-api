# BeeHeroes (status: refatorando API)

## Introdução

Este projeto tem como objetivo o desenvolvimento de um produto de software, que consiste em uma plataforma web para oferta e busca de trabalhos voluntários. A aplicação permitirá que as entidades sem fins lucrativos e outras organizações publiquem serviços e materiais que necessitam, e que os voluntários possam se candidatar para ajudar. A plataforma será gratuita e aberta a qualquer pessoa interessada em participar.

## Funcionalidades

As principais funcionalidades da plataforma incluem:

1. Registro de usuários: entidades e voluntários poderão se registrar na plataforma e criar seus perfis;
2. Publicação de serviços: as entidades poderão publicar informações sobre os serviços e materiais que necessitam;
3. Busca de serviços: os voluntários poderão pesquisar por serviços que desejam realizar e se candidatar para ajudar;
4. Comunicação: a plataforma terá um sistema de mensagens para que as entidades e os voluntários possam se comunicar e acertar detalhes sobre os serviços;
5. Avaliação: ao final de cada serviço realizado, os usuários poderão avaliar uns aos outros, ajudando a manter a qualidade dos serviços oferecidos na plataforma.

## Tecnologias Utilizadas

Para o desenvolvimento da plataforma, serão utilizadas as seguintes tecnologias:

- Linguagem de programação: Javascript;
- Banco de dados: PostgreSQL;
- Front-end: ReactJS;
- Hospedagem: Amazon Web Services (AWS). ??

# Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve oferecer:

| STATUS | DESCRIÇÃO                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------ |
| DONE   | Deve ser possível se cadastrar                                                                   |
| DONE   | Deve ser possível se autenticar                                                                  |
| DONE   | Deve ser possível obter o perfil de um usuário logado                                            |
| TO DO  | Deve ser possível obter os trabalhos voluntários realizados pelo usuário logado                  |
| TO DO  | Deve ser possível cadastrar organizações                                                         |
| TO DO  | Deve ser possível o usuário buscar organizações próximas                                         |
| TO DO  | Deve ser possível o usuário buscar organizações pelo nome                                        |
| TO DO  | Deve ser possível cadastrar projetos                                                             |
| TO DO  | Deve ser possível o usuário buscar projetos próximos                                             |
| TO DO  | Deve ser possível cadastrar projetos                                                             |
| TO DO  | Deve ser possível o usuário buscar solicitação de doações próximas                               |
| TO DO  | Deve ser possível o usuário realizar check-in em um projeto                                      |
| TO DO  | Deve ser possível avaliar o check-in de um usuário                                               |
| TO DO  | Deve ser possível validar o check-in de um usuário                                               |
| TO DO  | Deve ser possível cadastrar uma organização                                                      |
| TO DO  | Deve ser possível cadastrar um projeto                                                           |
| TO DO  | Deve ser possível a comunicação entre organizações e usuários através de um sistema de mensagens |
| TO DO  | Deve ser possível cadastrar solicitações de doações                                              |

# RNs (Regras de negócio)

| STATUS | DESCRIÇÃO                                                                    |
| ------ | ---------------------------------------------------------------------------- |
| DONE   | O usuário não deve poder se cadastrar com um e-mail duplicado                |
| TO DO  | O usuário não pode fazer check-in se não estiver perto (10km) da organização |
| TO DO  | O check-in só pode ser validado por administradores                          |
| TO DO  | Um projeto só pode ser cadastrado por administradores da organização         |

# RNFs (Requisitos não-funcionais)

| STATUS | DESCRIÇÃO                                                               |
| ------ | ----------------------------------------------------------------------- |
| DONE   | A senha do usuário precisa estar criptografada                          |
| DONE   | Os dados da aplicação precisam estar persistidos em um banco PostgreSQL |
| TO DO  | Todas listas de dados precisam estar paginadas com 20 itens por página  |
| DONE   | O usuário deve ser identificado por um JWT (JSON Web Token)             |

# Instalação local

## Requisitos

- Node
- Docker

## Instruções

1. Faça um clone desse projeto;
2. Modique o .env.example e preencha com os dados necessários
3. Execute os comandos abaixos;

Criação da imagem, do banco e da aplicação

```
  docker compose up -d
```

Criando as tabelas do banco de dados

```
  npx prisma migrate dev
```

Criando os seeds no banco de dados

```
  npx prisma db seed
```
