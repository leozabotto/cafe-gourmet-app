import { AddressResponse } from ".";
import { CustomerResponse } from "./customer";

export type OrderStatus =
  | "Aguardando Confirmação"
  | "Em Preparo"
  | "Concluído"
  | "Rejeitado";

export interface OrderItems {
  id: number;
  quantity: number;
  price: string;
  description: string;
}

export interface Order {
  id: number;
  date: string;
  total: string;
  status: OrderStatus;
}

interface OrderItemsRequest {
  productId: number;
  description: string;
  price: string;
  quantity: string
}
export interface OrderRequest  {
  date: Date;
  total: number;
  status: string;
  paymentForm: string;
  items: OrderItemsRequest[]
  addressId: number;
  customerId: number;
}
export interface OrderResponse extends Order {
  OrderItems: OrderItems[];
  customer: CustomerResponse;
  address: AddressResponse;
  paymentForm: string;
  customerId?: number;

}
