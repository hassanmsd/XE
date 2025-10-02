import { getProducts } from "@/app/lib/products";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();

  const categoryCount: Record<string, number> = {};
  products?.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  const commonCategories = Object.entries(categoryCount).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return NextResponse.json({
    categories: commonCategories.sort((a, b) => b.value - a.value),
  });
}
