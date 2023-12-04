export interface ProductResquest {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  active: boolean;
}