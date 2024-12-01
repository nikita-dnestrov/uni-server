import { PrismaClient, User, Address } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const UserService = {
  async getUsers(page: number, limit: number, sort: string, order: "asc" | "desc", search: string) {
    const users = await prisma.user.findMany({
      where: { email: { contains: search } },
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        address: true,
      },
    });

    const total = await prisma.product.count();

    return { users, total };
  },

  async getUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        address: true,
        orders: {
          include: {
            orderDetails: {
              include: { size: true, color: true, product: { include: { colors: { include: { images: true } } } } },
            },
          },
        },
      },
    });
  },

  async updateUser(userId: string, data: Partial<Pick<User, "name" | "phoneNumber" | "password">>): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },

  async deleteUser(userId: string): Promise<User> {
    return prisma.user.delete({
      where: { id: userId },
    });
  },

  async upsertAddress(userId: string, address: { city: string; street: string }): Promise<Address> {
    return prisma.address.upsert({
      where: { userId },
      update: {
        city: address.city,
        street: address.street,
      },
      create: {
        userId,
        city: address.city,
        street: address.street,
      },
    });
  },
};
