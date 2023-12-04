import { Order, OrderRequest, OrderResponse, apiCafe } from "..";

export const OrderServices = {
  findAll() {
    return apiCafe.get<OrderResponse[]>("/order");
  },
  create(order: OrderRequest) {
    return apiCafe.post<OrderResponse>("/order", {
      ...order,
    });
  },
  update(id: number, order: Order) {
    return apiCafe.put(`/order/${id}`, {
      ...order,
    });
  },
};
