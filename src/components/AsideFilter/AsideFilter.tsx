import { NavLink } from 'react-router-dom'
import Button from '../Button'

export default function AsideFilter() {
  return (
    <div>
      <NavLink to='/' className='flex items-end '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        <div className='ml-2 text-[15px] font-semibold capitalize text-gray-700'>Tất cả danh mục</div>
      </NavLink>
      <div className='mt-5 h-[1px] w-[100%] bg-gray-300'></div>
      <ul className='mt-5 '>
        <li>
          <NavLink to='/' className={`relative flex items-center px-3 py-1 text-sm font-semibold text-orange`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={'absolute left-0 h-3 w-3'}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>

            <span className='ml-2 capitalize'>Thời Trang Nam</span>
          </NavLink>
        </li>
        <li className='mt-1'>
          <NavLink to='/' className='relative flex items-center px-3 py-1'>
            <span className='ml-2 text-sm font-light capitalize text-gray-700'>Đồng hồ</span>
          </NavLink>
        </li>
      </ul>
      <div className='mt-5 h-[1px] w-[100%] bg-gray-300'></div>
      <div className='pt-4'>
        <p className='text-base font-light text-gray-700'>Khoảng Giá</p>
        <form className='mt-3'>
          <div className='flex items-center justify-between'>
            <input
              type='text'
              placeholder='₫ TỪ'
              className='w-[40%] rounded-sm border border-solid border-gray-300 px-1 py-1 text-sm text-gray-500 outline-none'
            />
            <span className='h-[1px] w-[10%] bg-gray-300'></span>
            <input
              type='text'
              placeholder='₫ ĐẾN'
              className='w-[40%] rounded-sm border border-solid border-gray-300 px-1 py-1 text-sm text-gray-500 outline-none'
            />
          </div>
          <Button addClass='py-[6px] mt-5 text-sm'>Áp Dụng</Button>
        </form>
      </div>
      <div className='mt-5 h-[1px] w-[100%] bg-gray-300'></div>
      <div className='pt-5'>
        <p className='text-base font-light text-gray-700'>Đánh giá</p>
        <div className='mt-3'>
          <div className='flex items-end gap-1'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <svg viewBox='0 0 9.5 8' className='h-3 w-3' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                )
              })}
          </div>
          <div className='mt-2 flex items-center gap-1'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <svg viewBox='0 0 9.5 8' className='h-3 w-3' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                )
              })}
            <div className='ml-1 text-sm'>trở lên</div>
          </div>
        </div>
      </div>
      <div className='mt-5 h-[1px] w-[100%] bg-gray-300'></div>
      <Button addClass='py-[6px] mt-5 text-sm'>Xóa Tất Cả</Button>
    </div>
  )
}
