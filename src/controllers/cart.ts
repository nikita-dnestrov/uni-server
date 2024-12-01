import { FastifyReply, FastifyRequest } from "fastify";
import { CartService } from "../services/cart";

export const CartController = {
  async getCart(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;

    const cart = await CartService.getOrCreateCart(userId);
    reply.send(cart);
  },

  async addProductToCart(req: FastifyRequest, reply: FastifyReply) {
    const { userId, productId, colorId, sizeId, quantity } = req.body as any;

    const cartDetail = await CartService.addProductToCart(userId, productId, colorId, sizeId, quantity);
    reply.status(201).send(cartDetail);
  },

  async removeProductFromCart(req: FastifyRequest, reply: FastifyReply) {
    const { cartDetailId, userId } = req.body as any;

    const data = await CartService.removeProductFromCart(cartDetailId, userId);
    reply.status(200).send(data);
  },

  async clearCart(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;

    await CartService.clearCart(userId);
    reply.status(204).send();
  },
};
