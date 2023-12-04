import { useQuery } from "@tanstack/react-query";
import { OrderResponse, OrderServices } from "..";

export const useOrderFindAll = () => {
  return useQuery<OrderResponse[]>({
    queryKey: ["useOrderFindAll"],
    queryFn: async () => {
      const { data } = await OrderServices.findAll();

      return data;
    },
  });
};
