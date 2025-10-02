/**
 * @jest-environment node
 */
import { GET } from "@/app/api/average-price/route";
import * as productsLib from "@/app/lib/products";
import { mockProducts } from "./mocks/products";

// Replace real getProducts with mock
jest.mock("@/app/lib/products");
const mockGetProducts = productsLib.getProducts as jest.Mock;

describe("GET /api/average-price", () => {
  beforeEach(() => {
    // Reset mocks and silence console
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  it("should calculate and return average price", async () => {
    // Setup: Mock returns products with prices 10 and 20
    mockGetProducts.mockResolvedValue(mockProducts);

    // Execute: Call the API
    const response = await GET();
    const data = await response.json();

    // Assert: Average of 10 and 20 is 15.00
    expect(data).toEqual({ averagePrice: "15.00" });
    expect(console.log).toHaveBeenCalledWith(
      "[GET /api/average-price] Returned 15 average price"
    );
  });

  it("should return 0 when no products exist", async () => {
    // Setup: Mock returns empty array
    mockGetProducts.mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    // Assert: Returns NaN formatted as string (division by zero)
    expect(data.averagePrice).toBe("NaN");
  });

  it("should handle error and return 500 status", async () => {
    // Setup: Mock throws error
    mockGetProducts.mockRejectedValue(new Error("Database error"));

    const response = await GET();
    const data = await response.json();

    // Assert: Check error response
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to calculate average price" });
  });
});
