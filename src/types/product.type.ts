import { orderConst, sortConst } from 'src/contants/product'

export interface ProductType {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}
export interface ProductListType {
  products: ProductType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export type ProductConfigParam = {
  page?: string
  limit?: string
  order?: typeof orderConst.desc | typeof orderConst.asc
  sort_by?: typeof sortConst.createdAt | typeof sortConst.view | typeof sortConst.sold | typeof sortConst.price
  category?: string
  exclude?: string
  rating_filter?: string
  price_max?: string
  price_min?: string
  name?: string
}
