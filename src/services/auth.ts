import bcrypt from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const AuthService = {
  async register(name: string, email: string, password: string, phoneNumber: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) throw new Error("User with such email is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: { name, email, password: hashedPassword, phoneNumber },
    });
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    return user;
  },

  async loginAdmin(email: string, password: string) {
    const user = await prisma.admin.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    return user;
  },
};
