import { PrismaClient, Cart, CartDetail, ProductSize } from "@prisma/client";

const prisma = new PrismaClient();

export const CartService = {
  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        user: { include: { address: true } },
        cartDetails: {
          include: {
            product: true,
            color: { include: { images: true } },
            size: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          user: { include: { address: true } },
          cartDetails: {
            include: {
              product: true,
              color: { include: { images: true } },
              size: true,
            },
          },
        },
      });
    }

    return cart;
  },

  async addProductToCart(
    userId: string,
    productId: string,
    colorId: string,
    sizeId: string,
    quantity: number
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const productSize = await prisma.productSize.findUnique({
      where: { id: sizeId },
    });

    if (!productSize) {
      throw new Error("Product size does not exist");
    }

    const existingCartDetail = await prisma.cartDetail.findFirst({
      where: {
        cartId: cart.id,
        productId,
        colorId,
        sizeId,
      },
    });

    if (existingCartDetail) {
      await prisma.cartDetail.update({
        where: { id: existingCartDetail.id },
        data: { quantity },
      });

      return await this.getOrCreateCart(userId);
    }

    await prisma.cartDetail.create({
      data: {
        cartId: cart.id,
        productId,
        colorId,
        sizeId,
        quantity,
      },
    });

    return await this.getOrCreateCart(userId);
  },

  async removeProductFromCart(cartDetailId: string, userId: string): Promise<any> {
    console.log(cartDetailId);
    await prisma.cartDetail.delete({
      where: { id: cartDetailId },
    });

    return await this.getOrCreateCart(userId);
  },

  async clearCart(userId: string): Promise<void> {
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      throw new Error("Cart does not exist for the user");
    }

    await prisma.cartDetail.deleteMany({
      where: { cartId: cart.id },
    });
  },

  async getCartItems(userId: string): Promise<CartDetail[]> {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartDetails: {
          include: {
            product: true,
            color: true,
            size: true,
          },
        },
      },
    });

    if (!cart) {
      return [];
    }

    return cart.cartDetails;
  },
};
