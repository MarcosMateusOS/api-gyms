import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;
describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    // Sut = Sistem Under Test
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Lewis",
      email: "lewis@gmail.com",
      password_hash: await hash("121321", 6),
    });
    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
