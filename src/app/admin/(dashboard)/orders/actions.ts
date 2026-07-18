"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendOrderConfirmationEmail, sendShippingUpdateEmail } from "@/lib/email";

export async function confirmOrder(orderId: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: "Confirmed" },
  });

  try {
    await sendOrderConfirmationEmail(
      order.customerEmail,
      order.orderNumber,
      order.customerName,
      order.totalAmount
    );
  } catch (e) {
    console.error("Failed to send COD confirmation email", e);
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });

  if (newStatus === "Shipped" || newStatus === "Delivered") {
    try {
      await sendShippingUpdateEmail(
        order.customerEmail,
        order.orderNumber,
        order.customerName,
        newStatus
      );
    } catch (e) {
      console.error("Failed to send shipping email", e);
    }
  }

  revalidatePath("/admin/orders");
}
