import sharp from "sharp";
import { dirname, join, normalize } from "path";
import { v4 as uuidv4 } from "uuid";
import { MultipartFile } from "@fastify/multipart";
import { pipeline } from "stream/promises";
import fs from "fs";
import { FastifyRequest } from "fastify";

export const UploadService = {
  // async processImages(req: FastifyRequest): Promise<string[]> {
  //   const parts = req.parts();
  //   const imageUrls: string[] = [];
  //   const options: any = {};

  //   for await (const part of parts) {
  //     if (part.type === "file") {
  //       try {
  //         [dirname(tempPath), dirname(outputPath)].forEach((dir) => {
  //           if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  //         });

  //         await pipeline(part.file, fs.createWriteStream(tempPath));

  //         await sharp(tempPath)
  //           .resize(+options.width || 350, +options.height || 350, {
  //             fit: options.fit || "cover",
  //             position: options.position || "center",
  //           })
  //           .jpeg({ quality: options.quality || 80 })
  //           .toFile(outputPath);

  //         imageUrls.push(`/public/images/${filename}`);
  //       } catch (error) {
  //         console.error("Error processing image:", error);
  //         throw new Error("Image processing failed");
  //       }
  //     } else {
  //       options[part.fieldname] = part.value;
  //     }
  //   }

  //   return imageUrls;
  // },

  async test() {
    await fs.promises.unlink("C:\\Users\\Nikita\\Documents\\UNI\\backend-cms-uni\\src\\uploads\\1631974023500.jfif");
  },

  async processImages2(path: string): Promise<string> {
    const filename = `${uuidv4()}.jpeg`;

    const outputPath = normalize(join(__dirname, `../../public/images/${filename}`));

    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        sharp(data)
          .resize(350, 350, {
            fit: "cover",
            position: "center",
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath, (err) => {
            if (err) {
              console.log("Error " + outputPath + " " + err.toString());
            } else {
              console.log("made " + outputPath);
              fs.unlink(path, (err) => {
                if (err) {
                  console.log("error deleting " + path + " " + err.toString());
                } else {
                  console.log("deleted " + path);
                }
              });
            }
          });
      }
    });

    return `/public/images/${filename}`;
  },
};
