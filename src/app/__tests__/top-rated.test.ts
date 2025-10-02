/**
 * @jest-environment node
 */

import { GET } from "@/app/api/top-rated/route";
import * as productsLib from "@/app/lib/products";
import { mockProducts } from "./mocks/products";

// Replace real getProducts with mock
jest.mock("@/app/lib/products");
const mockGetProducts = productsLib.getProducts as jest.Mock;

describe("GET /api/top-rated", () => {
  beforeEach(() => {
    // Reset mocks and silence console
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  it("should return top rated products with calculated average ratings", async () => {
    // Setup: Mock returns fake products
    mockGetProducts.mockResolvedValue(mockProducts);

    const response = await GET();
    const data = await response.json();

    // Assert: Check calculated averages and sorting
    expect(data).toEqual({
      topRated: [
        { title: "Product 1", rating: "5.00" }, // review rating: 5
        { title: "Product 2", rating: "4.00" }, // review rating: 4
      ],
    });
    expect(console.log).toHaveBeenCalledWith(
      "[GET /api/top-rated] Returned 2 top10"
    );
  });

  it("should return empty array when no products exist", async () => {
    mockGetProducts.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({ topRated: [] });
  });

  it("should handle error and return 500 status", async () => {
    // Setup: Mock throws error
    const error = new Error("Database error");
    mockGetProducts.mockRejectedValue(error);

    const response = await GET();
    const data = await response.json();

    // Assert: Check error response
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch top-rated products" });
    expect(console.error).toHaveBeenCalledWith(
      "Error in /api/top-rated:",
      error
    );
  });

  it("should use fallback rating when no reviews exist", async () => {
    // Setup: Product with no reviews
    const productsWithoutReviews = [
      {
        ...mockProducts[0],
        reviews: [],
        rating: 3.5,
      },
    ];
    mockGetProducts.mockResolvedValue(productsWithoutReviews);

    const response = await GET();
    const data = await response.json();

    // Assert: Uses base rating instead of calculating from reviews
    expect(data.topRated[0].rating).toBe("3.50");
  });

  it("should return only top 10 products when more than 10 exist", async () => {
    // Setup: 15 products
    const manyProducts = Array.from({ length: 15 }, (_, i) => ({
      ...mockProducts[0],
      id: i + 1,
      title: `Product ${i + 1}`,
      rating: 5 - i * 0.1,
      reviews: [],
    }));
    mockGetProducts.mockResolvedValue(manyProducts);

    const response = await GET();
    const data = await response.json();

    // Assert: Limited to 10
    expect(data.topRated).toHaveLength(10);
  });

  it("should sort products by average rating in descending order", async () => {
    // Setup: Unsorted products
    const unsortedProducts = [
      { ...mockProducts[0], rating: 2, reviews: [] },
      { ...mockProducts[1], rating: 5, reviews: [] },
      {
        ...mockProducts[0],
        id: 3,
        title: "Product 3",
        rating: 3.5,
        reviews: [],
      },
    ];
    mockGetProducts.mockResolvedValue(unsortedProducts);

    const response = await GET();
    const data = await response.json();

    // Assert: Highest rating first
    expect(data.topRated[0].title).toBe("Product 2");
    expect(data.topRated[1].title).toBe("Product 3");
    expect(data.topRated[2].title).toBe("Product 1");
  });
});
