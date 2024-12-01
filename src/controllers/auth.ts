import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth";

export const AuthController = {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, phoneNumber } = request.body as any;
    const user = await AuthService.register(name, email, password, phoneNumber);
    reply.status(201).send(user);
  },

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;
    const user = await AuthService.login(email, password);

    const token = await reply.jwtSign({ id: user.id, email: user.email });
    reply.send({ token });
  },

  async loginAdmin(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;
    const user = await AuthService.loginAdmin(email, password);

    const token = await reply.jwtSign({ id: user.id, email: user.email });
    reply.send({ adminToken: token, adminId: user.id });
  },
};
