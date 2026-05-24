"use client";

import { useEffect, useState } from "react";

export default function HomePage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);
      });

  }, []);

  async function reserve(item: any) {

    const res = await fetch(
      "/api/reservations",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          productId: item.productId,
          warehouseId: item.warehouseId,
          quantity: 1,
        }),
      }
    );

    const data = await res.json();

    if (res.status === 409) {

      setMessage(
        "Stock unavailable"
      );

      return;
    }

    window.location.href =
      `/checkout/${data.id}`;
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #dbeafe, #f1f5f9)",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >

          <h1
            style={{
              fontSize: "70px",
              fontWeight: "900",
              color: "#1e293b",
              marginBottom: "10px",
            }}
          >

            Inventory Reservation

          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "#475569",
            }}
          >

            Real-Time Product Reservation System

          </p>

        </div>

        {message && (

          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "15px",
              borderRadius: "15px",
              marginBottom: "30px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >

            {message}

          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >

          {products.map((item) => (

            <div
              key={item.inventoryId}

              style={{
                background: "white",
                borderRadius: "30px",
                padding: "30px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >

                <div>

                  <h2
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: "#0f172a",
                    }}
                  >

                    {item.product}

                  </h2>

                  <p
                    style={{
                      color: "#64748b",
                      marginTop: "5px",
                    }}
                  >

                    Smart Inventory Product

                  </p>

                </div>

                <div
                  style={{
                    background: "#dcfce7",
                    color: "#15803d",
                    padding:
                      "10px 18px",
                    borderRadius: "50px",
                    fontWeight: "bold",
                  }}
                >

                  In Stock

                </div>

              </div>

              <div
                style={{
                  background: "#f1f5f9",
                  padding: "20px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
              >

                <p
                  style={{
                    color: "#64748b",
                    marginBottom: "8px",
                  }}
                >

                  Warehouse

                </p>

                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#334155",
                  }}
                >

                  {item.warehouse}

                </h3>

              </div>

              <div
                style={{
                  background: "#dbeafe",
                  padding: "20px",
                  borderRadius: "20px",
                  marginBottom: "30px",
                }}
              >

                <p
                  style={{
                    color: "#2563eb",
                    marginBottom: "8px",
                  }}
                >

                  Available Stock

                </p>

                <h3
                  style={{
                    fontSize: "50px",
                    fontWeight: "900",
                    color: "#1d4ed8",
                  }}
                >

                  {item.available}

                </h3>

              </div>

              <button

                onClick={() =>
                  reserve(item)
                }

                style={{
                  width: "100%",
                  background:
                    "linear-gradient(to right, #2563eb, #4f46e5)",
                  color: "white",
                  border: "none",
                  padding: "18px",
                  borderRadius: "20px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >

                Reserve Product

              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}