# Inventory Reservation System

A full-stack Inventory Reservation System built using Next.js, Prisma ORM, SQLite, and TypeScript.

This application allows users to:
- View products and warehouse stock
- Reserve products in real-time
- Prevent overselling
- Confirm or cancel reservations
- Track reservation expiry using a countdown timer

---

# Tech Stack

Frontend:
- Next.js
- TypeScript
- Tailwind CSS / Inline Styling

Backend:
- Next.js API Routes
- Prisma ORM

Database:
- SQLite

---

# Features

## Product Listing
- Displays products with:
  - Product name
  - Warehouse
  - Available stock

## Reservation System
- Reserve product stock
- Prevent reservation if stock unavailable

## Checkout Page
- Countdown timer
- Confirm Purchase button
- Cancel Reservation button

## Inventory Management
- Reserved stock tracking
- Automatic stock updates

---

# Project Structure

```bash
inventory-reservation-app
│
├── app
│   ├── api
│   │   ├── products
│   │   └── reservations
│   │
│   ├── checkout
│   │   └── [id]
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── lib
│   └── prisma.ts
│
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   ├── seed.ts
│   └── dev.db
│
├── public
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```
