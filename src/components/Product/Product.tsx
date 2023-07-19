import { Link } from 'react-router-dom'
import { ProductType } from 'src/types/product.type'
import { formatPrice, formatSold, removeSpecialCharacter } from 'src/utils/util'
import ProductRating from '../ProductRating'

interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`/${removeSpecialCharacter(product.name)}-i.${product._id}`} className='relative'>
      <div className='min-h-[320px] w-full rounded-sm bg-white shadow-sm transition-all duration-200 hover:translate-y-[-3px] hover:shadow'>
        <div className='relative w-full overflow-hidden pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute left-0 top-0 w-full rounded-tl-sm rounded-tr-sm object-contain'
          />
        </div>
        <div className='px-1 py-2'>
          <div className='text-xs font-light text-gray-700 line-clamp-2'>{product.name}</div>
          <div className='mt-2 flex items-center justify-start gap-2'>
            <div className='max-w-[50%] truncate text-sm font-light text-gray-400 line-through'>
              ₫{formatPrice(product.price_before_discount)}
            </div>
            <div className='max-w-[50%] truncate text-base text-orange'>
              <span className='text-sm'>₫</span>
              <span>{formatPrice(product.price)}</span>
            </div>
          </div>
          <div className='mt-2'>
            <ProductRating rating={product.rating} />
            <span className='ml-3 text-xs font-light'>Đã bán {formatSold(product.sold).toLowerCase()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
