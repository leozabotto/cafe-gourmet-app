import { useQuery } from "@tanstack/react-query";
import { ProductResponse, ProductServices } from "..";

export const useProductsFindAll = () => {
  return useQuery<ProductResponse[]>({
    queryKey: ["useProductsFindAll"],
    queryFn: async () => {
      const { data } = await ProductServices.findAll();

      return data;
    },
  });
};
