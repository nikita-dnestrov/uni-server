import { FastifyInstance } from "fastify";
import { AdminController } from "../controllers/admin";
import { authenticateAdmin, authenticateJWT } from "../middlewares/auth";

export const AdminRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/all", { preHandler: [authenticateAdmin] }, AdminController.getAllAdmins);

  fastify.get("/:adminId", { preHandler: [authenticateJWT] }, AdminController.getAdminById);

  fastify.put("/password/:adminId", { preHandler: [authenticateJWT] }, AdminController.updateAdminPassword);

  fastify.delete("/:adminId", { preHandler: [authenticateJWT] }, AdminController.deleteAdmin);

  fastify.post("/", { preHandler: [authenticateJWT] }, AdminController.createAdmin);
};
