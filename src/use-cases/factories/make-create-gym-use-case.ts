import { PrismaGymsRepository } from '@/respositories/prisma/prisma-gyms-repository'
import { CreateGymCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymCase(gymsRepository)

  return useCase
}
