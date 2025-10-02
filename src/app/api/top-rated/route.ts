import { NextResponse } from "next/server";

import { getProducts } from "@/app/lib/products";

export async function GET() {
  try {
    const products = await getProducts();

    // If no products, return empty list
    if (!products?.length) return NextResponse.json({ topRated: [] });

    // Compute average rating for each product
    const ratedProducts = products.map((p) => {
      if (p.reviews && p.reviews.length > 0) {
        const avg =
          p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length;
        return { ...p, avgReviewRating: avg };
      }
      return { ...p, avgReviewRating: p.rating }; // fallback
    });

    // Pick top 10 by rating
    const top10 = ratedProducts
      .sort((a, b) => (b.avgReviewRating || 0) - (a.avgReviewRating || 0))
      .slice(0, 10)
      .map((p) => ({
        title: p.title,
        rating: p.avgReviewRating?.toFixed(2),
      }));

    // success logging
    console.log(`[GET /api/top-rated] Returned ${top10?.length} top10`);

    return NextResponse.json({ topRated: top10 });
  } catch (error) {
    console.error("Error in /api/top-rated:", error);
    return NextResponse.json(
      { error: "Failed to fetch top-rated products" },
      { status: 500 }
    );
  }
}
