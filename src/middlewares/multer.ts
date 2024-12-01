import multer from "fastify-multer";

export const multerMiddleware = multer({ dest: "uploads/" });
