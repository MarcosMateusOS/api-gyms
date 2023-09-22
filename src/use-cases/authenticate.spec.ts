import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    // Sut = Sistem Under Test
    sut = new AuthenticateUseCase(usersRepository);
  });
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Lewis",
      email: "lewis@gmail.com",
      password_hash: await hash("121321", 6),
    });
    const { user } = await sut.execute({
      email: "lewis@gmail.com",
      password: "121321",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "lewis@gmail.com",
        password: "121321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Lewis",
      email: "lewis@gmail.com",
      password_hash: await hash("1213212", 6),
    });

    await expect(() =>
      sut.execute({
        email: "lewis@gmail.com",
        password: "121321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
