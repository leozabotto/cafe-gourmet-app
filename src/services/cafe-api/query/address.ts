import { useQuery } from "@tanstack/react-query";
import { AddressResponse } from "..";
import { AddressServices } from "../request/address";

export const useAddressFindAll = () => {
  return useQuery<AddressResponse[]>({
    queryKey: ["useAddressFindAll"],
    queryFn: async () => {
      const { data } = await AddressServices.findAll();

      return data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
