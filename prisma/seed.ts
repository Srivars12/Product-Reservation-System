import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.reservation.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  const warehouse1 =
    await prisma.warehouse.create({
      data: {
        name: "Chennai Warehouse",
      },
    });

  const warehouse2 =
    await prisma.warehouse.create({
      data: {
        name: "Bangalore Warehouse",
      },
    });

  const products = [
    {
      name: "iPhone 15",
      stock: 10,
    },
    {
      name: "Samsung S24",
      stock: 8,
    },
    {
      name: "MacBook Air M3",
      stock: 5,
    },
    {
      name: "Sony Headphones",
      stock: 12,
    },
    {
      name: "iPad Pro",
      stock: 7,
    },
  ];

  for (const item of products) {

    const product =
      await prisma.product.create({
        data: {
          name: item.name,
        },
      });

    await prisma.inventory.create({
      data: {
        productId: product.id,
        warehouseId: warehouse1.id,
        totalStock: item.stock,
      },
    });

    await prisma.inventory.create({
      data: {
        productId: product.id,
        warehouseId: warehouse2.id,
        totalStock: item.stock + 5,
      },
    });
  }

  console.log("Database Seeded");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });