import { getProducts } from "@/app/lib/products";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();
  const total = products?.reduce((acc, p) => acc + p.price, 0) || 0;
  const avg = total / (products?.length || 0);

  return NextResponse.json({ averagePrice: avg.toFixed(2) });
}
