import { useQuery } from '@tanstack/react-query'
import SEO from 'src/SEO'
import productApi from 'src/apis/product.api'
import img from 'src/assets'
import AsideFilter from 'src/components/AsideFilter'
import NotProductFilter from 'src/components/NotProductFilter'
import Pagination from 'src/components/Pagination'
import Product from 'src/components/Product'
import SortProduct from 'src/components/SortProduct'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductConfigParam } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductConfigParam]: string
}
export default function ProductList() {
  const queryConfig = useQueryConfig()

  const productsQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductConfigParam),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  return (
    <>
      <SEO
        title='Shopee Clone'
        description='Trang chủ Shopee Clone'
        img={img.Shopee}
        name='Minh Bui'
        type='summary'
      ></SEO>
      <div className='w-full bg-gray-medium pt-6'>
        <div className='container grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <AsideFilter queryConfig={queryConfig} />
          </div>
          <div className='col-span-10'>
            {productsQuery.data?.data.data.products.length === 0 ? (
              <NotProductFilter queryConfig={queryConfig} />
            ) : (
              productsQuery.data && (
                <div className='col-span-10'>
                  <SortProduct pageSize={productsQuery.data.data.data.pagination.page_size} queryConfig={queryConfig} />
                  <div className='mt-3 grid grid-cols-12 gap-2 lg:grid-cols-10'>
                    {productsQuery.data.data.data.products.map((product) => {
                      return (
                        <div key={product._id} className='col-span-6 mt-3 md:col-span-3 lg:col-span-2'>
                          <Product product={product} />
                        </div>
                      )
                    })}
                  </div>
                  <Pagination pageSize={productsQuery.data.data.data.pagination.page_size} queryConfig={queryConfig} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
