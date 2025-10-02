export interface Review {
  rating: number;
  comment?: string;
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  tags: string[];
  brand: string;
  reviews?: Review[];
  images?: string[];
  thumbnail?: string;
  warrantyInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  shippingInformation: string;
  sku: string;
  weight: number;
}

export interface SnackbarArgs {
  isOpen?: boolean;
  onClose?: () => void;
  severity?: Severity;
  message?: string;
  autoHideDuration?: number;
}

export interface TopRated {
  title: string;
  rating: string | undefined;
}

export interface StocksData {
  title: string;
  stock: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

type Severity = "success" | "error" | "info" | "warning";
