import { InMemoryGymsRepository } from "@/respositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;

let sut: FetchNearbyGymsUseCase;

describe("Fetch Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();

    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby Gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -21.7454298,
      longitude: -43.3623857,
    });

    const { gyms } = await sut.execute({
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });
});
