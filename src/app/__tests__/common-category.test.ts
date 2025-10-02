/**
 * @jest-environment node
 */
import { GET } from "@/app/api/common-category/route";
import * as productsLib from "@/app/lib/products";
import { mockProducts } from "./mocks/products";

// Replace real getProducts with mock
jest.mock("@/app/lib/products");
const mockGetProducts = productsLib.getProducts as jest.Mock;

describe("GET /api/common-category", () => {
  beforeEach(() => {
    // Reset mocks and silence console
    jest.clearAllMocks();
    console.info = jest.fn();
    console.error = jest.fn();
  });

  it("should return categories sorted by frequency", async () => {
    // Setup: Create products with different categories
    const productsWithCategories = [
      { ...mockProducts[0], category: "Electronics" },
      { ...mockProducts[1], category: "Electronics" },
      { ...mockProducts[0], id: 3, category: "Clothing" },
      { ...mockProducts[0], id: 4, category: "Electronics" },
    ];
    mockGetProducts.mockResolvedValue(productsWithCategories);

    // Execute: Call the API
    const response = await GET();
    const data = await response.json();

    // Assert: Electronics (3) comes before Clothing (1)
    expect(data.categories).toEqual([
      { name: "Electronics", value: 3 },
      { name: "Clothing", value: 1 },
    ]);
    expect(console.info).toHaveBeenCalledWith(
      "[GET /api/common-category] Returned 2 categories"
    );
  });

  it("should return empty array when no products exist", async () => {
    // Setup: Mock returns empty array
    mockGetProducts.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    // Assert: Returns empty categories
    expect(data.categories).toEqual([]);
  });

  it("should handle error and return 500 status", async () => {
    // Setup: Mock throws error
    mockGetProducts.mockRejectedValue(new Error("Database error"));

    const response = await GET();
    const data = await response.json();

    // Assert: Check error response
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch categories" });
  });
});
