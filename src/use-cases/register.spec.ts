import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterUserCase } from "./register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserCase;
describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Lewis",
      email: " lewis@gmail.com",
      password: "121321",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Lewis",
      email: " lewis@gmail.com",
      password: "121321",
    });

    const isPasswordCorrectlyHashed = await compare(
      "121321",
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "example@example.com";

    await sut.execute({
      name: "Lewis",
      email,
      password: "121321",
    });

    await expect(() =>
      sut.execute({
        name: "Lewis",
        email,
        password: "121321",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
