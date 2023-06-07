import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to='/' className='relative'>
      <div className='min-h-[320px] w-full rounded-sm bg-white shadow-sm transition-all duration-200 hover:translate-y-[-3px] hover:shadow'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfuiqipjg1kn56_tn'
            alt='Product'
            className='absolute left-0 top-0 w-full rounded-tl-sm rounded-tr-sm object-contain'
          />
        </div>
        <div className='px-1 py-2'>
          <div className='text-xs font-light text-gray-700 line-clamp-2'>
            Đồng Hồ Cơ Nam Chính Hãng JSDUN 8938 Đồng Hồ Nam Automatic Dây Thép Đúc Đặc Kháng Nước 5ATM
          </div>
          <div className='mt-2 flex items-center justify-start gap-2'>
            <div className='max-w-[50%] truncate text-sm font-light text-gray-400 line-through'>₫2.500.000</div>
            <div className='max-w-[50%] truncate text-base text-orange'>
              <span className='text-sm'>₫</span>
              <span>2.000.000</span>
            </div>
          </div>
          <div className='mt-2'>
            <div className='relative inline-block'>
              <div className='absolute left-0 top-0 w-[50%] overflow-hidden'>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='h-3 w-3 fill-yellow-400'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='h-3 w-3 fill-current text-gray-bold'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <span className='ml-3 text-xs font-light'>Đã bán 1,3k</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
