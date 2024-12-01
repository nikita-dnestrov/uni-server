import { FastifyReply, FastifyRequest } from "fastify";

export const authenticateJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};
