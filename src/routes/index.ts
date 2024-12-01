import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./auth";
import { ProductRoutes } from "./product";
import { OrderRoutes } from "./order";
import { UploadRoutes } from "./upload";
import { CartRoutes } from "./cart";
import { UserRoutes } from "./user";
import { AdminRoutes } from "./admin";

export const GlobalRouter = async (fastify: FastifyInstance) => {
  fastify.register(AuthRoutes, { prefix: "/auth" });
  fastify.register(OrderRoutes, { prefix: "/orders" });
  fastify.register(ProductRoutes, { prefix: "/products" });
  fastify.register(UploadRoutes, { prefix: "/upload" });
  fastify.register(CartRoutes, { prefix: "/cart" });
  fastify.register(UserRoutes, { prefix: "/user" });
  fastify.register(AdminRoutes, { prefix: "/admin" });
};
