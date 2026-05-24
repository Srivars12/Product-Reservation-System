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

  await prisma.inventory.updateMany({
    where: {
      productId: reservation.productId,
      warehouseId: reservation.warehouseId,
    },
    data: {
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
      status: "released",
    },
  });

  return Response.json({
    message: "Reservation released",
  });
}