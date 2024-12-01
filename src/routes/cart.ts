import { FastifyInstance } from "fastify";
import { CartController } from "../controllers/cart";
import { authenticateJWT } from "../middlewares/auth";

export const CartRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/:userId", { preHandler: [authenticateJWT] }, CartController.getCart);
  fastify.post("/", { preHandler: [authenticateJWT] }, CartController.addProductToCart);
  fastify.delete("/product", { preHandler: [authenticateJWT] }, CartController.removeProductFromCart);
  fastify.delete("/clear/:userId", { preHandler: [authenticateJWT] }, CartController.clearCart);
};
