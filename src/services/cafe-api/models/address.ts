export interface AddressRequest {
  street: string;
  number: string;
  zipcode: string;
  neighborhood: string;
  state: string;
  city: string;
  complement: string;
  customerId: number;
}

export interface AddressResponse extends AddressRequest {
  id: number;
}
