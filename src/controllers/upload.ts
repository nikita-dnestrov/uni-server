import { FastifyRequest, FastifyReply } from "fastify";
import { UploadService } from "../services/upload";
import { pipeline } from "stream/promises";
import fs from "fs";
import { join, normalize } from "path";

export const UploadController = {
  async uploadAndProcessImages(req: FastifyRequest, reply: FastifyReply) {
    try {
      const parts = req.files();
      const tempUrls = [];

      for await (const part of parts) {
        const tempPath = normalize(join(__dirname, `../../uploads/${part.filename}`));

        await pipeline(part.file, fs.createWriteStream(tempPath));
        tempUrls.push(tempPath);
      }

      const finalUrls = [];
      for await (const url of tempUrls) {
        const final = await UploadService.processImages2(url);
        finalUrls.push(final);
      }
      reply.status(201).send({ urls: finalUrls });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Image processing failed" });
    }
  },
};
