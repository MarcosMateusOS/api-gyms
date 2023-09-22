import { GymsRepository } from "@/respositories/gym-repository";
import { Gym } from "@prisma/client";

interface SearchGymCaseRequest {
  query: string;
  page: number;
}

interface SearchGymCaseResponse {
  gyms: Gym[];
}

export class SearchGymCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymCaseRequest): Promise<SearchGymCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
