import { NextResponse } from "next/server";

export async function GET() {

  return NextResponse.json([
    {
      id: 1,
      product: "iPhone 15",
      warehouse: "Chennai",
      available: 10,
    },

    {
      id: 2,
      product: "Samsung Galaxy S24",
      warehouse: "Bangalore",
      available: 8,
    },

    {
      id: 3,
      product: "MacBook Air M3",
      warehouse: "Mumbai",
      available: 5,
    },

    {
      id: 4,
      product: "Sony WH-1000XM5",
      warehouse: "Delhi",
      available: 12,
    },

    {
      id: 5,
      product: "iPad Pro",
      warehouse: "Hyderabad",
      available: 7,
    }
  ]);
}