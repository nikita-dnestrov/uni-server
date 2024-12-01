import { FastifyReply, FastifyRequest } from "fastify";
import { OrderService } from "../services/order";

export const OrderController = {
  async getOrderById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const order = await OrderService.getOrderById(id);
    if (!order) return reply.status(404).send({ message: "Order not found" });
    reply.send(order);
  },

  async getOrdersByUserId(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;
    const orders = await OrderService.getOrdersByUserId(userId);
    reply.send(orders);
  },

  async getAllOrders(req: FastifyRequest, reply: FastifyReply) {
    const orders = await OrderService.getAllOrders();
    reply.send(orders);
  },

  async createOrder(req: FastifyRequest, reply: FastifyReply) {
    console.log(req.body);
    const order = await OrderService.createOrder(req.body as any);
    reply.status(201).send(order);
  },

  async updateOrder(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as any;
    const updatedOrder = await OrderService.updateOrder(id, req.body as any);
    reply.send(updatedOrder);
  },

  async getAllOrdersAdmin(req: FastifyRequest, reply: FastifyReply) {
    const { page = 1, limit = 10, sort = "date", order = "asc", search = "", status = undefined } = req.query as any;
    const updatedOrder = await OrderService.getOrders(parseInt(page), parseInt(limit), sort, order, search, { status });
    reply.send(updatedOrder);
  },
};
