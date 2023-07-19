import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { SchemaSearchType, schemaSearch } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import omit  from 'lodash/omit'

export default function useSearchHeader() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<SchemaSearchType>({
    defaultValues: {
      search: queryConfig.name
    },
    resolver: yupResolver(schemaSearch)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    const config = queryConfig.order ? omit({ ...queryConfig }, ['sort_by', 'order']) : { ...queryConfig }
    if (data.search) {
      navigate({
        pathname: '/',
        search: createSearchParams(
          omit(
            {
              ...config,
              name: data.search,
              page: '1'
            },
            ['category']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: '/',
        search: createSearchParams(
          omit(
            {
              ...config
            },
            ['name']
          )
        ).toString()
      })
    }
  })
  return { register, onSubmit }
}
