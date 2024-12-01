import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/product";

export const ProductController = {
  async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      order = "asc",
      search = "",
      material = undefined,
      gender = undefined,
      category = undefined,
      brand = undefined,
    } = req.query as any;

    console.log(req.query);

    const { products, total } = await ProductService.getProducts(parseInt(page), parseInt(limit), sort, order, search, {
      material,
      gender,
      category,
      brand,
    });

    reply.send({
      data: products,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  },

  async getAllProductsAdmin(req: FastifyRequest, reply: FastifyReply) {
    const { page = 1, limit = 10, sort = "name", order = "asc", search = "" } = req.query as any;

    const { products, total } = await ProductService.getProductsAdmin(sort, order, search);

    reply.send({
      data: products,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  },

  async getOneProduct(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;

    const product = await ProductService.getProductById(id);

    reply.send(product);
  },

  async createBaseProduct(req: FastifyRequest, reply: FastifyReply) {
    const product = await ProductService.createBaseProduct(req.body as any);

    reply.status(201).send(product);
  },

  async createProdcutColor(req: FastifyRequest, reply: FastifyReply) {
    const color = await ProductService.createProductColor(req.body as any);

    reply.status(201).send(color);
  },

  async updateProduct(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const product = await ProductService.updateProduct(id, req.body);
    reply.send(product);
  },

  async deleteProduct(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    await ProductService.deleteProduct(id);
    reply.status(204).send();
  },
};
