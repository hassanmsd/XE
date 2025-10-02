import { NextResponse } from "next/server";

import { getProducts } from "@/app/lib/products";

export async function GET() {
  try {
    const products = await getProducts();

    // Map only stock-related fields
    const stockData = products?.map((p) => ({
      title: p.title,
      stock: p.stock,
    }));

    // success logging
    console.log(`[GET /api/stock-levels] Returned ${stockData?.length} stocks`);

    return NextResponse.json({ stockLevels: stockData });
  } catch (error) {
    console.error("Error fetching stock levels:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock levels" },
      { status: 500 }
    );
  }
}
