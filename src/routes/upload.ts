import { FastifyInstance } from "fastify";

import { UploadController } from "../controllers/upload";

export const UploadRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/images", UploadController.uploadAndProcessImages);
};
