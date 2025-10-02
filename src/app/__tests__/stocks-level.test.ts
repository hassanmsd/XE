/**
 * @jest-environment node
 */
import { GET } from "@/app/api/stock-levels/route";
import * as productsLib from "@/app/lib/products";
import { mockProducts } from "./mocks/products";

// Replace real getProducts with mock
jest.mock("@/app/lib/products");
const mockGetProducts = productsLib.getProducts as jest.Mock;

describe("GET /api/stock-levels", () => {
  beforeEach(() => {
    // Reset mocks and silence console
    jest.clearAllMocks();
    console.info = jest.fn();
    console.error = jest.fn();
  });

  it("should return stock levels with title and stock only", async () => {
    // Setup: Mock returns fake products
    mockGetProducts.mockResolvedValue(mockProducts);

    // Execute: Call the API
    const response = await GET();
    const data = await response.json();

    // Assert: Returns only title and stock fields
    expect(data.stockLevels).toEqual([
      { title: "Product 1", stock: 20 },
      { title: "Product 2", stock: 15 },
    ]);
    expect(console.info).toHaveBeenCalledWith(
      "[GET /api/stock-levels] Returned 2 stocks"
    );
  });

  it("should return empty array when no products exist", async () => {
    // Setup: Mock returns empty array
    mockGetProducts.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    // Assert: Returns empty stock levels
    expect(data.stockLevels).toEqual([]);
  });

  it("should handle error and return 500 status", async () => {
    // Setup: Mock throws error
    mockGetProducts.mockRejectedValue(new Error("Database error"));

    const response = await GET();
    const data = await response.json();

    // Assert: Check error response
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch stock levels" });
  });
});
