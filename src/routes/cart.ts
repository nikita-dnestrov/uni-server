import { FastifyInstance } from "fastify";
import { CartController } from "../controllers/cart";
import { authenticateJWT, authenticateUser } from "../middlewares/auth";

export const CartRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/:userId", { preHandler: [authenticateUser] }, CartController.getCart);
  fastify.post("/", { preHandler: [authenticateUser] }, CartController.addProductToCart);
  fastify.delete("/product", { preHandler: [authenticateUser] }, CartController.removeProductFromCart);
  fastify.delete("/clear/:userId", { preHandler: [authenticateUser] }, CartController.clearCart);
};
