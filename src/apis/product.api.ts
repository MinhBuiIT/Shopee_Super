import { ResponseType } from 'src/types/Response.type'
import { ProductConfigParam, ProductListType, ProductType } from 'src/types/product.type'
import { http } from 'src/utils/http'

const URL = 'products'
const productApi = {
  getProducts: (params: ProductConfigParam) => {
    return http.get<ResponseType<ProductListType>>(URL, {
      params
    })
  },
  getProductItem: (id: string) => {
    return http.get<ResponseType<ProductType>>(`${URL}/${id}`)
  }
}

export default productApi
