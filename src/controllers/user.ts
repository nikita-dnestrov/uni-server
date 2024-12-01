import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user";

export const UserController = {
  async getUserById(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;

    const user = await UserService.getUserById(userId);
    if (!user) return reply.status(404).send({ message: "User not found" });

    reply.send(user);
  },

  async updateUser(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;
    const data = req.body as any;

    const updatedUser = await UserService.updateUser(userId, data);
    reply.send(updatedUser);
  },

  async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;

    const deletedUser = await UserService.deleteUser(userId);
    reply.send(deletedUser);
  },

  async upsertAddress(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.params as any;
    const { city, street } = req.body as any;

    const address = await UserService.upsertAddress(userId, { city, street });
    reply.send(address);
  },

  async getAllUsersAdmin(req: FastifyRequest, reply: FastifyReply) {
    const { page = 1, limit = 10, sort = "name", order = "asc", search = "" } = req.query as any;
    const updatedOrder = await UserService.getUsers(parseInt(page), parseInt(limit), sort, order, search);
    reply.send(updatedOrder);
  },
};
