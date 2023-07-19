import { ResponseType } from 'src/types/Response.type'
import { CategoryListType } from 'src/types/category.type'
import { http } from 'src/utils/http'

export const categoriesApi = {
  getCategories: () => {
    return http.get<ResponseType<CategoryListType>>('categories')
  }
}
