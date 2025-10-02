import axios from "axios";

import { Product } from "../types/global";

let cachedData: Product[] | null = null;

export async function getProducts() {
  if (!cachedData) {
    const res = await axios("https://dummyjson.com/products");
    const data = await res.data;
    cachedData = data.products;
  }
  return cachedData;
}
