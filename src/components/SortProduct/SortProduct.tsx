import Button from '../Button'
import Popover from '../Popover'

export default function SortProduct() {
  return (
    <div className='flex items-center justify-between rounded-sm bg-gray-bold px-6 py-3'>
      <div className='flex items-center gap-3'>
        <span className='text-light text-sm'>Sắp xếp theo</span>
        <div>
          <Button className='rounded-sm bg-orange px-3 py-2 text-sm capitalize text-white shadow'>Phổ Biến</Button>
        </div>
        <div>
          <Button className='rounded-sm bg-white px-3 py-2 text-sm capitalize text-gray-700 shadow'>Mới Nhất</Button>
        </div>
        <div>
          <Button className='rounded-sm bg-white px-3 py-2 text-sm capitalize text-gray-700 shadow'>Bán chạy</Button>
        </div>
        <Popover
          placementMode='bottom'
          element={
            <div className='flex w-[200px] items-center justify-between rounded-sm bg-white px-3 py-2 text-gray-700 shadow'>
              <span>Giá</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          }
        >
          <div className='text-light w-[200px] bg-white px-3 py-4 text-base text-gray-700'>
            <p className='hover:text-orange'>Giá: Thấp đến Cao</p>
            <p className='mt-4 hover:text-orange'>Giá: Cao đến Thấp</p>
          </div>
        </Popover>
      </div>
      <div className='flex items-center gap-3'>
        <div className='text-sm text-gray-700'>
          <span className='text-orange'>1</span>
          <span>/9</span>
        </div>
        <div className='flex'>
          <div className='flex items-center justify-center rounded-sm border border-gray-300 bg-white p-3 shadow-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 text-gray-400'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </div>
          <div className='flex items-center justify-center rounded-sm border border-gray-300 bg-gray-bold p-3 shadow-sm duration-200 hover:bg-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 text-gray-700'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
