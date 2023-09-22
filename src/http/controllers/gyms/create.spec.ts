import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/create-and-authentica-user";
describe("Crate Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create gyms", async () => {
    const token = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Teste",
        latitude: 0,
        longitude: 0,
        phone: "2341231312",
      });

    expect(response.statusCode).toEqual(201);
  });
});
