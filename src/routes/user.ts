import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user";
import { authenticateJWT, authenticateUser } from "../middlewares/auth";

export const UserRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/admin/all", { preHandler: [authenticateJWT] }, UserController.getAllUsersAdmin);

  fastify.get("/:userId", { preHandler: [authenticateUser] }, UserController.getUserById);

  fastify.put("/:userId", { preHandler: [authenticateUser] }, UserController.updateUser);

  fastify.delete("/:userId", { preHandler: [authenticateJWT] }, UserController.deleteUser);

  fastify.put("/:userId/address", { preHandler: [authenticateUser] }, UserController.upsertAddress);
};
