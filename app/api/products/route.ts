import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const inventories =
      await prisma.inventory.findMany({
        include: {
          product: true,
          warehouse: true,
        },
      });

    const formatted =
      inventories.map((item) => ({

        inventoryId: item.id,

        productId:
          item.productId,

        warehouseId:
          item.warehouseId,

        product:
          item.product.name,

        warehouse:
          item.warehouse.name,

        available:
          item.totalStock -
          item.reservedStock,
      }));

    return Response.json(formatted);

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        message:
          "Error fetching products",
      },
      {
        status: 500,
      }
    );
  }
}