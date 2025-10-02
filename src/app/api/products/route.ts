import { NextResponse } from "next/server";

import { getProducts } from "@/app/lib/products";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Parse pagination params
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const products = await getProducts();

    // Slice products for pagination
    const result = products?.slice(offset, offset + limit).map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      price: p.price,
      rating: p.rating,
      thumbnail: p.thumbnail,
      images: p.images,
      brand: p.brand,
      reviews: p.reviews,
      warrantyInformation: p.warrantyInformation,
      availabilityStatus: p.availabilityStatus,
      stock: p.stock,
    }));

    // success logging
    console.log(`[GET /api/products] Returned ${result?.length} products`);

    return NextResponse.json({
      offset,
      limit,
      total: products?.length || 0,
      products: result,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
