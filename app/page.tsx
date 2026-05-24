"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

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
      available: 12,
    },

    {
      id: 5,
      product: "iPad Pro",
      warehouse: "Hyderabad",
      available: 6,
    },
  ];

  function reserveProduct(id: number) {
    router.push(`/checkout/${id}`);
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          fontSize: "52px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#111827",
        }}
      >
        Inventory Reservation
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "22px",
          marginBottom: "50px",
          color: "#4b5563",
        }}
      >
        Real-Time Product Reservation System
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
        }}
      >

        {products.map((item) => (

          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >

            <h2
              style={{
                fontSize: "28px",
                marginBottom: "15px",
                color: "#111827",
              }}
            >
              {item.product}
            </h2>

            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Warehouse: {item.warehouse}
            </p>

            <p
              style={{
                fontSize: "18px",
                marginBottom: "25px",
              }}
            >
              Available Stock: {item.available}
            </p>

            <button
              onClick={() => reserveProduct(item.id)}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Reserve Product
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}