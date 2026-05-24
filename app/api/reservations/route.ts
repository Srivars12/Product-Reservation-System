import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      productId,
      warehouseId,
      quantity,
    } = body;

    const inventory =
      await prisma.inventory.findFirst({
        where: {
          productId,
          warehouseId,
        },
      });

    if (!inventory) {
      return Response.json(
        { message: "Inventory not found" },
        { status: 404 }
      );
    }

    const available =
      inventory.totalStock -
      inventory.reservedStock;

    if (available < quantity) {
      return Response.json(
        { message: "Not enough stock" },
        { status: 409 }
      );
    }

    await prisma.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        reservedStock: {
          increment: quantity,
        },
      },
    });

    const reservation =
      await prisma.reservation.create({
        data: {
          productId,
          warehouseId,
          quantity,
          status: "pending",
          expiresAt: new Date(
            Date.now() + 10 * 60 * 1000
          ),
        },
      });

    return Response.json(reservation);

  } catch (error) {

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}