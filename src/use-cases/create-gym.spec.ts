import { InMemoryGymsRepository } from "@/respositories/in-memory/in-memory-gyms-repository";

import { describe, it, expect, beforeEach } from "vitest";
import { CreateGymCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymCase;
describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
