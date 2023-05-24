import { UsersRepository } from '@/repositories/users-repository'

import { hash } from 'bcryptjs'
import { Status, User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UserAlreadyExistsError } from '../errors/user-already-exist-error'

interface UpdateUseCaseRequest {
  id: string
  name?: string
  email?: string
  password?: string
  avatarUrl?: string
  cityId?: number
  isVolunteer?: boolean
  status?: Status
}

interface UpdateUseCaseResponse {
  user: User
}

export class UpdateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    avatarUrl,
    cityId,
    isVolunteer,
    status,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const password_hash = password ? await hash(password, 6) : undefined

    const userExist = await this.usersRepository.findById(id)

    if (!userExist) {
      throw new ResourceNotFoundError()
    }

    const userWithSameEmail =
      email && (await this.usersRepository.findByEmail(email))

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.update(
      {
        name,
        email,
        password_hash,
        avatar_url: avatarUrl,
        city_id: cityId,
        is_volunteer: isVolunteer,
        status,
      },
      id,
    )

    return {
      user,
    }
  }
}
