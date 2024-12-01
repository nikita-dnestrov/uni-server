import { FastifyRequest, FastifyReply } from "fastify";
import { AdminService } from "../services/admin";

export const AdminController = {
  async getAdminById(req: FastifyRequest, reply: FastifyReply) {
    const { adminId } = req.params as any;

    const admin = await AdminService.getAdminById(adminId);
    if (!admin) return reply.status(404).send({ message: "Admin not found" });

    reply.send(admin);
  },

  async updateAdminPassword(req: FastifyRequest, reply: FastifyReply) {
    const { adminId } = req.params as any;
    const data = req.body as any;

    const updatedAdmin = await AdminService.updateAdminPassword(adminId, data.password);
    reply.send(updatedAdmin);
  },

  async deleteAdmin(req: FastifyRequest, reply: FastifyReply) {
    const { adminId } = req.params as any;

    const deletedAdmin = await AdminService.deleteAdmin(adminId);
    reply.send(deletedAdmin);
  },

  async createAdmin(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as any;

    const newAdmin = await AdminService.createAdmin(data);
    reply.status(201).send(newAdmin);
  },

  async getAllAdmins(req: FastifyRequest, reply: FastifyReply) {
    const { page = 1, limit = 10, search = "" } = req.query as any;

    const admins = await AdminService.getAdmins(parseInt(page), parseInt(limit), search);
    reply.send(admins);
  },
};
