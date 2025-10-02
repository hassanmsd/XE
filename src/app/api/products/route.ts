import { getProducts } from "@/app/lib/products";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const products = await getProducts();

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

  return NextResponse.json({
    offset,
    limit,
    total: products?.length || 0,
    products: result,
  });
}
