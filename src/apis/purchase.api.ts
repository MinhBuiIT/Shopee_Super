import { ResponseType } from 'src/types/Response.type'
import { PurchaseStatusList, PurchaseType } from 'src/types/purchase.type'
import { http } from 'src/utils/http'

const URL = 'purchases'
const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<ResponseType<PurchaseType[]>>(`${URL}/add-to-cart`, body)
  },
  getPurchases: (params: { status: PurchaseStatusList }) => {
    return http.get<ResponseType<PurchaseType[]>>(`${URL}`, {
      params
    })
  },
  buyProducts: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<ResponseType<PurchaseType[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase: (body: { product_id: string; buy_count: number }) => {
    return http.put<ResponseType<PurchaseType>>(`${URL}/update-purchase`, body)
  },
  deletePurchase: (data: string[]) => {
    return http.delete<ResponseType<{ deleted_count: number }>>(`${URL}`, {
      data
    })
  }
}
export default purchaseApi
