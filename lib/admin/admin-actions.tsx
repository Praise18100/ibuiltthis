"use server";
//import all necessary components
import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductType } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//function to approve a product
export const approveProductAction = async (productId: ProductType["id"]) => {
  console.log("Approve product", productId);

  try {
    await db
      .update(products)
      .set({ status: "approved", approvedAt: new Date() })
      .where(eq(products.id, productId));

    revalidatePath("/admin");// refresh cache so UI is updated immediately

    return {
      success: true,
      message: "Product approved successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to approve product",
    };
  }
};

export const rejectProductAction = async (productId: ProductType["id"]) => {
  console.log("Reject product", productId);
  try {
    await db
      .update(products)
      .set({ status: "rejected" })
      .where(eq(products.id, productId));

    revalidatePath("/admin");

    return {
      success: true,
      message: "Product rejected successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to reject product",
    };
  }
};
