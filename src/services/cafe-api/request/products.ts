import { ProductResponse, ProductResquest, apiCafe } from "..";

export const ProductServices = {
  create(product: ProductResquest) {
    return apiCafe.post('/product', {
      ...product
    })
  },
  update(id: number, product: ProductResponse) {
    return apiCafe.put(`/product/${id}`, {
      ...product
    })
  },
  findAll() {
    return apiCafe.get<ProductResponse[]>('/product')
  }
}