export interface Order {
  id: number;
  totalPrice: number;
  dateOfOrder: string;
  dateOfArrival: string;
  status: string;
  orderItems: OrderItem[];
  phoneNumber?: string;
  email?: string;
}

export interface OrderItem {
  productName: string;
  productMainImage: string;
  quantitiy: number;
  totalPriceForThisProduct: number;
  withInstallation?: boolean;
}
