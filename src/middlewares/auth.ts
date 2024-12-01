import { FastifyReply, FastifyRequest } from "fastify";

export const authenticateJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: "Invalid or missing token" });
  }
};

export const authenticateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();

    const { role } = request.user as any;
    if (role !== "user") {
      return reply.status(403).send({ message: "Access denied. User role required." });
    }
  } catch (err) {
    reply.status(401).send({ message: "Invalid or missing token" });
  }
};

export const authenticateAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();

    const { role } = request.user as any;
    if (role !== "admin") {
      return reply.status(403).send({ message: "Access denied. Admin role required." });
    }
  } catch (err) {
    reply.status(401).send({ message: "Invalid or missing token" });
  }
};
