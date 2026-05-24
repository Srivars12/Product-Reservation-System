import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  try {

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: Number(params.id),
        },
      });

    if (!reservation) {

      return Response.json(
        {
          message:
            "Reservation not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(reservation);

  } catch (error) {

    return Response.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}