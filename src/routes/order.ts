import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/order";
import { authenticateJWT } from "../middlewares/auth";

export const OrderRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/:id", { preHandler: [authenticateJWT] }, OrderController.getOrderById);

  fastify.get("/admin/all", { preHandler: [authenticateJWT] }, OrderController.getAllOrdersAdmin);

  fastify.get("/user/:userId", { preHandler: [authenticateJWT] }, OrderController.getOrdersByUserId);

  fastify.post("/", { preHandler: [authenticateJWT] }, OrderController.createOrder);

  fastify.put("/:id", { preHandler: [authenticateJWT] }, OrderController.updateOrder);

  fastify.get("/admin", { preHandler: [authenticateJWT] }, OrderController.getAllOrders);
};
