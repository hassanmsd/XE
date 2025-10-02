/**
 * @jest-environment node
 */
import { GET } from "@/app/api/products/route";
import * as productsLib from "@/app/lib/products";
import { mockProducts } from "./mocks/products";

// Replace real getProducts with mock
jest.mock("@/app/lib/products");
const mockGetProducts = productsLib.getProducts as jest.Mock;

describe("GET /api/products", () => {
  beforeEach(() => {
    // Reset mocks and silence console
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  it("should return paginated products with default params", async () => {
    // Setup: Mock returns fake products
    mockGetProducts.mockResolvedValue(mockProducts);

    // Execute: Call API without query params (default offset=0, limit=10)
    const req = new Request("http://localhost:3000/api/products");
    const response = await GET(req);
    const data = await response.json();

    // Assert: Check pagination and data structure
    expect(data).toEqual({
      offset: 0,
      limit: 10,
      total: 2,
      products: expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: "Product 1",
        }),
      ]),
    });
  });

  it("should handle pagination with offset and limit", async () => {
    // Setup: Create 15 products
    const manyProducts = Array.from({ length: 15 }, (_, i) => ({
      ...mockProducts[0],
      id: i + 1,
      title: `Product ${i + 1}`,
    }));
    mockGetProducts.mockResolvedValue(manyProducts);

    // Execute: Request with offset=5, limit=3
    const req = new Request(
      "http://localhost:3000/api/products?offset=5&limit=3"
    );
    const response = await GET(req);
    const data = await response.json();

    // Assert: Returns products 6-8
    expect(data.offset).toBe(5);
    expect(data.limit).toBe(3);
    expect(data.total).toBe(15);
    expect(data.products).toHaveLength(3);
    expect(data.products[0].id).toBe(6);
  });

  it("should handle error and return 500 status", async () => {
    // Setup: Mock throws error
    mockGetProducts.mockRejectedValue(new Error("Database error"));

    const req = new Request("http://localhost:3000/api/products");
    const response = await GET(req);
    const data = await response.json();

    // Assert: Check error response
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch products" });
  });
});
