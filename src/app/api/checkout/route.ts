import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerName, customerEmail, customerPhone, address, city, paymentMethod, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Generate unique order number
    const orderNumber = `SHM-${Math.floor(100000 + Math.random() * 900000)}`;

    // Set initial status
    // COD is always Pending Confirmation. BOP is Pending Payment (or Confirmed if payment is immediate, but we assume it's pending until webhook).
    const initialStatus = paymentMethod === "COD" ? "Pending Confirmation" : "Pending Payment";

    // Start a transaction to create order and items, and reduce stock
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          address,
          city,
          totalAmount,
          paymentMethod,
          status: initialStatus,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              variantDetails: item.variant || null,
            })),
          },
        },
      });

      // Deduct stock for each item
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    // TODO: Send confirmation email here via nodemailer

    return NextResponse.json({ success: true, orderNumber: order.orderNumber, orderId: order.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
