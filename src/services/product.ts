import { Prisma, PrismaClient, Product, ProductColor, ProductSize } from "@prisma/client";
import { join } from "path";
import sharp from "sharp";

const prisma = new PrismaClient();

export const ProductService = {
  async getProducts(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc",
    search: string,
    filters: {
      material?: string;
      gender?: string;
      category?: string;
      brand?: string;
    }
  ) {
    const query: any = {
      isArchived: false,
    };

    if (filters.material) query.material = { equals: filters.material };
    if (filters.gender) query.gender = { equals: filters.gender };
    if (filters.category) query.category = { equals: filters.category };
    if (filters.brand) query.brand = { equals: filters.brand };
    if (search) query.name = { contains: search };

    const products = await prisma.product.findMany({
      where: query,
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        colors: {
          include: {
            images: true,
            sizes: true,
          },
        },
      },
    });

    const total = await prisma.product.count({
      where: query,
    });

    return { products, total };
  },

  async getProductsAdmin(sort: string, order: string, search: string) {
    const products = await prisma.product.findMany({
      orderBy: { [sort]: order },
      where: { name: { contains: search } },
      include: { colors: { include: { images: true, sizes: true } } },
    });

    const total = await prisma.product.count();

    return { products, total };
  },

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { colors: { include: { sizes: true, images: true } } },
    });

    return product;
  },

  async createBaseProduct(data: Product) {
    const { name, brand, description, material, gender, category } = data;

    return prisma.product.create({
      data: {
        name,
        brand,
        description,
        material,
        gender,
        category,
      },
    });
  },

  async createProductColor(data: ProductColor & { images: string[]; sizes: ProductSize[] }) {
    const { color, productId, sizes, images } = data;
    const productColor = await prisma.productColor.create({
      data: {
        color,
        productId,
        sizes: {
          create: sizes,
        },
        images: {
          create: images.map((url) => ({ url })),
        },
      },
    });

    return productColor;
  },

  async updateProduct(id: string, data: any) {
    const { name, description, isArchived, brand, category, colors } = data;

    return prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        isArchived,
        brand,
        category,
        colors: {
          create: colors.map((color: any) => ({
            color: color.color,
            sizes: {
              create: color.sizes,
            },
            images: {
              create: color.images.map((url: string) => ({ url })),
            },
          })),
        },
      },
    });
  },

  async deleteProduct(id: string) {
    return prisma.product.delete({ where: { id } });
  },

  async normalizeImages(files: any[]) {
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const outputPath = join(__dirname, `../public/images/${file.filename}.jpeg`);

        await sharp(file.path)
          .resize(350, 350, {
            fit: sharp.fit.cover,
            position: sharp.strategy.attention,
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        return `/images/${file.filename}.jpeg`;
      })
    );

    return imageUrls;
  },
};
