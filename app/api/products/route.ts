import { NextResponse } from "next/server";

export async function GET() {

  const products = [
    {
      id: 1,
      product: "iPhone 15",
      warehouse: "Chennai",
      available: 10,
    },
    {
      id: 2,
      product: "Samsung S24",
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
      product: "Sony Headphones",
      warehouse: "Delhi",
      available: 15,
    },
    {
      id: 5,
      product: "iPad Pro",
      warehouse: "Hyderabad",
      available: 6,
    },
  ];

  return NextResponse.json(products);
}