import { PrismaClient, Admin } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const AdminService = {
  async getAdmins(page: number, limit: number, search: string) {
    const admins = await prisma.admin.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { email: { contains: search } },
    });

    const total = await prisma.admin.count({
      where: { email: { contains: search } },
    });

    return { admins, total };
  },

  async getAdminById(adminId: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { id: adminId },
    });
  },

  async updateAdminPassword(adminId: string, password: string): Promise<Admin> {
    const hash = await bcrypt.hash(password, 10);

    return prisma.admin.update({
      where: { id: adminId },
      data: { password: hash },
    });
  },

  async deleteAdmin(adminId: string): Promise<Admin> {
    return prisma.admin.delete({
      where: { id: adminId },
    });
  },

  async createAdmin(data: Pick<Admin, "email" | "password">): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.admin.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
  },
};
