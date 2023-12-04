import { AddressRequest, AddressResponse, apiCafe } from ".."

export const AddressServices = {
  create(product: AddressRequest) {
    return apiCafe.post('/address', {
      ...product
    })
  },
  update(id: number, product: AddressResponse) {
    return apiCafe.put(`/address/${id}`, {
      ...product
    })
  },
  findAll() {
    return apiCafe.get<AddressResponse[]>('/address')
  }
}