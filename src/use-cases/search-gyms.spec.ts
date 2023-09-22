import { InMemoryGymsRepository } from "@/respositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;

let sut: SearchGymCase;

describe("Fetch Searh Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();

    sut = new SearchGymCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });
});
