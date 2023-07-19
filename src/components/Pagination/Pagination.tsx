import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

type Props = {
  pageSize: number
  queryConfig: QueryConfig
}

const RANGE = 2
let isDot = false
export default function Pagination({ pageSize, queryConfig }: Props) {
  const currentNum = Number(queryConfig.page)
  return (
    <div className='mt-5 flex items-center justify-center gap-4 pb-5'>
      {currentNum === 1 ? (
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5 opacity-50'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </div>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (currentNum - 1).toString()
            }).toString()
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
      )}

      {Array(pageSize)
        .fill(0)
        .map((_, index) => {
          const pageNum = index + 1
          const isActive = pageNum === currentNum
          if (
            pageNum <= RANGE ||
            pageNum > pageSize - RANGE ||
            (pageNum >= currentNum - RANGE && pageNum <= currentNum + RANGE)
          ) {
            isDot = true
            return (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    page: pageNum.toString()
                  }).toString()
                }}
                key={index}
                className={classNames('rounded-sm px-4 py-2 text-center text-base font-light ', {
                  'bg-orange text-white': isActive,
                  'bg-transparent text-gray-500': !isActive
                })}
              >
                {pageNum}
              </Link>
            )
          } else if (isDot) {
            isDot = false
            return (
              <span key={index} className='text-base text-gray-500'>
                ...
              </span>
            )
          }
        })}
      {currentNum === pageSize ? (
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5 opacity-50'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </div>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (currentNum + 1).toString()
            }).toString()
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
    </div>
  )
}
