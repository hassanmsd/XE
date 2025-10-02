import { getProducts } from "@/app/lib/products";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();

  const stockData = products?.map((p) => ({
    title: p.title,
    stock: p.stock,
  }));

  return NextResponse.json({ stockLevels: stockData });
}
