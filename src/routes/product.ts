import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/product";
import { authenticateJWT } from "../middlewares/auth";
import { multerMiddleware } from "../middlewares/multer";

export const ProductRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", ProductController.getAllProducts);

  fastify.get("/admin/all", ProductController.getAllProductsAdmin);

  fastify.get("/:id", ProductController.getOneProduct);

  fastify.post("/create-base", { preHandler: authenticateJWT }, ProductController.createBaseProduct);
  fastify.post(
    "/create-color",
    { preHandler: [authenticateJWT, multerMiddleware.array("images")] },
    ProductController.createProdcutColor
  );
  fastify.put("/:id", { preHandler: [authenticateJWT] }, ProductController.updateProduct);
  fastify.delete("/:id", { preHandler: [authenticateJWT] }, ProductController.deleteProduct);
};
