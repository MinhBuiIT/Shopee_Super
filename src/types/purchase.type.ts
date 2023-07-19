import { ProductType } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5
export type PurchaseStatusList = 0 | PurchaseStatus
export type PurchaseType = {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: ProductType
  createdAt: string
  updatedAt: string
}
