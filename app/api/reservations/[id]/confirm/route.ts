import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {

  const reservation =
    await prisma.reservation.findUnique({
      where: {
        id: Number(params.id),
      },
    });

  if (!reservation) {
    return Response.json(
      { message: "Reservation not found" },
      { status: 404 }
    );
  }

  if (reservation.expiresAt < new Date()) {
    return Response.json(
      { message: "Reservation expired" },
      { status: 410 }
    );
  }

  await prisma.inventory.updateMany({
    where: {
      productId: reservation.productId,
      warehouseId: reservation.warehouseId,
    },
    data: {
      totalStock: {
        decrement: reservation.quantity,
      },
      reservedStock: {
        decrement: reservation.quantity,
      },
    },
  });

  await prisma.reservation.update({
    where: {
      id: reservation.id,
    },
    data: {
      status: "confirmed",
    },
  });

  return Response.json({
    message: "Reservation confirmed",
  });
}
