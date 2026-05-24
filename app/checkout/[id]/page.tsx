"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CheckoutPage() {

  const params = useParams();
  const router = useRouter();

  const [reservation, setReservation] =
    useState<any>(null);

  const [timeLeft, setTimeLeft] =
    useState("10:00");

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    if (!params?.id) return;

    fetch(`/api/reservations/${params.id}`)
      .then((res) => res.json())
      .then((data) => {

        setReservation(data);

        const expiryTime =
          new Date(data.expiresAt).getTime();

        const updateTimer = () => {

          const now =
            new Date().getTime();

          const difference =
            expiryTime - now;

          if (difference <= 0) {

            setTimeLeft("00:00");

            return;
          }

          const minutes =
            Math.floor(
              difference / 1000 / 60
            );

          const seconds =
            Math.floor(
              (difference / 1000) % 60
            );

          const formatted =
            `${minutes
              .toString()
              .padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`;

          setTimeLeft(formatted);
        };

        updateTimer();

        const interval =
          setInterval(updateTimer, 1000);

        return () =>
          clearInterval(interval);
      });

  }, [params]);

  async function confirmPurchase() {

    const res = await fetch(
      `/api/reservations/${params.id}/confirm`,
      {
        method: "POST",
      }
    );

    const data = await res.json();

    if (res.status === 410) {

      setMessage(
        "Reservation Expired"
      );

      return;
    }

    setMessage(
      "Purchase Confirmed Successfully"
    );

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  async function cancelReservation() {

    await fetch(
      `/api/reservations/${params.id}/release`,
      {
        method: "POST",
      }
    );

    setMessage(
      "Reservation Cancelled"
    );

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  if (!reservation) {

    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">

        <div className="bg-white p-10 rounded-3xl shadow-2xl">

          <h1 className="text-4xl font-bold animate-pulse">
            Loading...
          </h1>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-xl rounded-[30px] shadow-2xl p-10 border border-gray-200">

        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
          Checkout
        </h1>

        {message && (
          <div className="bg-blue-100 border border-blue-300 text-blue-700 p-4 rounded-2xl text-center font-semibold mb-8 shadow-sm">
            {message}
          </div>
        )}

        <div className="space-y-6">

          <div className="bg-gray-100 rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm mb-2">
              Reservation ID
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              #{reservation.id}
            </h2>

          </div>

          <div className="bg-gray-100 rounded-2xl p-5 shadow-sm">

            <p className="text-gray-500 text-sm mb-2">
              Reservation Status
            </p>

            <h2 className="text-2xl font-bold capitalize text-green-600">
              {reservation.status}
            </h2>

          </div>

          <div className="bg-red-100 rounded-3xl p-8 text-center shadow-inner border border-red-200">

            <p className="text-red-500 text-xl mb-4 font-semibold">
              Reservation Timer
            </p>

            <h1 className="text-7xl font-extrabold text-red-600 tracking-widest">
              {timeLeft}
            </h1>

          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-5 mt-10">

          <button
            onClick={confirmPurchase}
            className="flex-1 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-4 rounded-2xl text-xl font-bold shadow-lg"
          >
            Confirm Purchase
          </button>

          <button
            onClick={cancelReservation}
            className="flex-1 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-4 rounded-2xl text-xl font-bold shadow-lg"
          >
            Cancel Reservation
          </button>

        </div>

      </div>

    </div>
  );
}