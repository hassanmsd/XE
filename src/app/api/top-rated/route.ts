import { getProducts } from "@/app/lib/products";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();

  if (!products?.length) return NextResponse.json({ topRated: [] });

  const ratedProducts = products.map((p) => {
    if (p.reviews && p.reviews.length > 0) {
      const avg =
        p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length;
      return { ...p, avgReviewRating: avg };
    }
    return { ...p, avgReviewRating: p.rating }; // fallback
  });

  const top5 = ratedProducts
    .sort((a, b) => (b.avgReviewRating || 0) - (a.avgReviewRating || 0))
    .slice(0, 10)
    .map((p) => ({
      title: p.title,
      rating: p.avgReviewRating?.toFixed(2),
    }));

  return NextResponse.json({ topRated: top5 });
}
