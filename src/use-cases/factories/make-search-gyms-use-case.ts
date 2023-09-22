import { PrismaGymsRepository } from '@/respositories/prisma/prisma-gyms-repository'
import { SearchGymCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymCase(gymsRepository)

  return useCase
}
