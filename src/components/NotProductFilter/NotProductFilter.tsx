import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import img from 'src/assets'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
interface Props {
  queryConfig: QueryConfig
}
export default function NotProductFilter({ queryConfig }: Props) {
  const navigate = useNavigate()
  const handleRemoveFilter = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit({ ...queryConfig }, ['category', 'rating_filter', 'price_max', 'price_min'])
      ).toString()
    })
  }
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <img src={img.NotProduct} alt='NotProduct' className='w-[200px]' />
      <p className='text-center text-lg font-light text-gray-600'>
        Hix. Không có sản phẩm nào. Bạn thử tắt điều kiện lọc và tìm lại nhé?
        <span className='mt-4 block'>or</span>
      </p>
      <button
        className='mt-4 rounded-sm bg-orange px-3 py-2 text-center text-base text-white hover:bg-orange/90'
        onClick={handleRemoveFilter}
      >
        Xóa bộ lọc
      </button>
    </div>
  )
}
