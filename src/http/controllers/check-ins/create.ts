import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use.case";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const creatCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const { gymId } = creatCheckInsParamsSchema.parse(request.params);

  const checkInUseCase = makeCheckInUseCase();
  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude:latitude,
    userLongitude:longitude,
  });

  return reply.status(201).send();
}
