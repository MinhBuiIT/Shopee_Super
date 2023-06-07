import AsideFilter from 'src/components/AsideFilter'
import Product from 'src/components/Product'
import SortProduct from 'src/components/SortProduct'

export default function ProductList() {
  return (
    <div className='w-full bg-gray-medium pt-6'>
      <div className='container grid grid-cols-12 gap-6'>
        <div className='col-span-2'>
          <AsideFilter />
        </div>
        <div className='col-span-10'>
          <SortProduct />
          <div className='mt-3 grid grid-cols-12 gap-2 lg:grid-cols-10'>
            {Array(20)
              .fill(0)
              .map((_, index) => {
                return (
                  <div key={index} className='col-span-6 mt-3 md:col-span-3 lg:col-span-2'>
                    <Product />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
