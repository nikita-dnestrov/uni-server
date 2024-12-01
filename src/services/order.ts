import { PrismaClient, Order, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const OrderService = {
  async getOrders(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc",
    search: string,
    filters: {
      status?: string;
    }
  ) {
    const query: any = {};

    if (filters.status) query.status = { equals: filters.status };

    const orders = await prisma.order.findMany({
      where: query,
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { include: { address: true } },
        orderDetails: { include: { product: true, color: true, size: true } },
      },
    });

    const total = await prisma.order.count({
      where: query,
    });

    return { orders, total };
  },

  async getOrderById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: { orderDetails: { include: { product: true } } },
    });
  },

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      include: { orderDetails: { include: { product: true } } },
    });
  },

  async getAllOrders(): Promise<Order[]> {
    return prisma.order.findMany({
      include: { orderDetails: { include: { product: true } } },
    });
  },

  async createOrder(data: any): Promise<Order> {
    const { status, userId, orderDetails } = data;

    console.log(status, userId, orderDetails);
    return prisma.order.create({ data: { status, userId, orderDetails: { create: orderDetails } } });
  },

  async updateOrder(id: string, data: Prisma.OrderUpdateInput): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data,
    });
  },
};
