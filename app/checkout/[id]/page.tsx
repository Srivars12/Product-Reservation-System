"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {

  const params = useParams();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function confirmPurchase() {
    alert("Purchase Confirmed");
    router.push("/");
  }

  function cancelReservation() {
    alert("Reservation Cancelled");
    router.push("/");
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "500px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >

        <h1
          style={{
            fontSize: "38px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Checkout Reservation
        </h1>

        <div
          style={{
            background: "#fee2e2",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >

          <p
            style={{
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            Reservation Timer
          </p>

          <h2
            style={{
              fontSize: "50px",
              color: "red",
            }}
          >
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h2>

        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >

          <button
            onClick={confirmPurchase}
            style={{
              flex: 1,
              background: "green",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Confirm
          </button>

          <button
            onClick={cancelReservation}
            style={{
              flex: 1,
              background: "red",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}