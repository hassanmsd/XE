import { NextResponse } from "next/server";

import { getProducts } from "@/app/lib/products";

export async function GET() {
  try {
    const products = await getProducts();

    // Compute total and average price
    const total = products?.reduce((acc, p) => acc + p.price, 0) || 0;
    const avg = total / (products?.length || 0);

    // success logging
    console.log(`[GET /api/average-price] Returned ${avg} average price`);

    return NextResponse.json({ averagePrice: avg.toFixed(2) });
  } catch (error) {
    console.error("Error fetching average price:", error);
    return NextResponse.json(
      { error: "Failed to calculate average price" },
      { status: 500 }
    );
  }
}
