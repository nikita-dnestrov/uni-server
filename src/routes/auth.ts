import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth";

export const AuthRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/register", AuthController.register);
  fastify.post("/login", AuthController.login);
  fastify.post("/admin-login", AuthController.loginAdmin);
};
