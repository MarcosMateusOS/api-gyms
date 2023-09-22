import { InMemoryCheckInsRepository } from "@/respositories/in-memory/in-memory-check-ins-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { ValidateCheckInUseCase } from "@/use-cases/validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();

    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutres of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    const twentyOneMInutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMInutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: "inexistent",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
