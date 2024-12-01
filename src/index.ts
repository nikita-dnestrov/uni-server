import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { join } from "path";

import { GlobalRouter } from "./routes";

const fastify = Fastify({ logger: true });

fastify.register(cors);
fastify.register(require("@fastify/multipart"));
fastify.register(jwt, { secret: "your-secret-key" });

fastify.register(require("@fastify/static"), {
  root: join(__dirname, "../public/images"),
  prefix: "/public/images",
});

fastify.setErrorHandler((error, request, reply) => {
  console.log(error);

  const statusCode = error.statusCode || 500;

  reply.status(statusCode).send({
    statusCode,
    error: error.name || "Internal Server Error",
    message: error.message || "Something went wrong",
  });
});

fastify.register(GlobalRouter, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: "0.0.0.0" });
    console.log("Server running at http://localhost:5000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
