import { QueryConfig } from 'src/pages/ProductList/ProductList'
import useProductParam from './useProductParam'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

export default function useQueryConfig() {
  const queryParam = useProductParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '10',
      category: queryParam.category,
      exclude: queryParam.exclude,
      name: queryParam.name,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      rating_filter: queryParam.rating_filter,
      sort_by: queryParam.sort_by
    },
    isUndefined
  )
  return queryConfig
}
