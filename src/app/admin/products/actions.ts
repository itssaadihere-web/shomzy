"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveFile } from "@/lib/upload";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const categoryId = formData.get("categoryId") as string;
  const imageFile = formData.get("image") as File;

  let imagePath = "/images/hero_headphones.png";
  if (imageFile && imageFile.size > 0) {
    const savedPath = await saveFile(imageFile);
    if (savedPath) imagePath = savedPath;
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      stock,
      categoryId,
      images: JSON.stringify([imagePath]),
    }
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const categoryId = formData.get("categoryId") as string;
  const imageFile = formData.get("image") as File;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const data: any = {
    name,
    slug,
    description,
    price,
    stock,
    categoryId,
  };

  if (imageFile && imageFile.size > 0) {
    const savedPath = await saveFile(imageFile);
    if (savedPath) {
      data.images = JSON.stringify([savedPath]);
    }
  }

  await prisma.product.update({
    where: { id },
    data
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}
