import { NextResponse } from "next/server";

import { getProducts } from "@/app/lib/products";

export async function GET() {
  try {
    const products = await getProducts();

    // Count products per category
    const categoryCount: Record<string, number> = {};
    products?.forEach((p) => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    // Convert counts into array and sort by frequency
    const commonCategories = Object.entries(categoryCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // success logging
    console.info(
      `[GET /api/common-category] Returned ${commonCategories?.length} categories`
    );

    return NextResponse.json({ categories: commonCategories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
