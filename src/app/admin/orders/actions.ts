"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function confirmOrder(orderId: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "Confirmed" },
  });

  // TODO: Send Confirmation Email via Nodemailer

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });

  // TODO: Send status update email

  revalidatePath("/admin/orders");
}
