import classNames from 'classnames'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { orderConst, sortConst } from 'src/contants/product'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import { ProductConfigParam } from 'src/types/product.type'
import Button from '../Button'
import Popover from '../Popover'
type Props = {
  pageSize: number
  queryConfig: QueryConfig
}
export default function SortProduct({ pageSize, queryConfig }: Props) {
  const { t } = useTranslation()
  const currentPage = Number(queryConfig.page)
  const navigate = useNavigate()
  const sortBy = queryConfig.sort_by || sortConst.createdAt
  const orderBy = queryConfig.order || orderConst.desc
  const isActiveSort = (sortByValue: Exclude<ProductConfigParam['sort_by'], undefined>) => {
    return sortByValue === sortBy
  }
  const isActiveOrder = (orderByValue: Exclude<ProductConfigParam['order'], undefined>) => {
    return orderBy === orderByValue
  }
  const handleSortClick = (
    sortByValue: Exclude<ProductConfigParam['sort_by'], undefined>,
    order?: ProductConfigParam['order']
  ) => {
    if (order === undefined) {
      navigate({
        pathname: '/',
        search: createSearchParams(
          omit(
            {
              ...queryConfig,
              sort_by: sortByValue
            },
            ['order']
          )
        ).toString()
      })
    } else {
      navigate({
        pathname: '/',
        search: createSearchParams({
          ...queryConfig,
          sort_by: sortByValue,
          order: order
        }).toString()
      })
    }
  }

  return (
    <div className='flex items-center justify-between rounded-sm bg-gray-bold px-6 py-3'>
      <div className='flex items-center gap-3'>
        <span className='text-light text-sm'>{t('Sort.sort by')}</span>
        <div>
          <Button
            className={classNames('rounded-sm  px-3 py-2 text-sm capitalize shadow', {
              'bg-orange text-white': isActiveSort('view'),
              'bg-white text-gray-700': !isActiveSort('view')
            })}
            onClick={() => handleSortClick('view')}
          >
            {t('Sort.popular')}
          </Button>
        </div>
        <div>
          <Button
            className={classNames('rounded-sm  px-3 py-2 text-sm capitalize shadow', {
              'bg-orange text-white': isActiveSort('createdAt'),
              'bg-white text-gray-700': !isActiveSort('createdAt')
            })}
            onClick={() => handleSortClick('createdAt')}
          >
            {t('Sort.lasest')}
          </Button>
        </div>
        <div>
          <Button
            className={classNames('rounded-sm  px-3 py-2 text-sm capitalize shadow', {
              'bg-orange text-white': isActiveSort('sold'),
              'bg-white text-gray-700': !isActiveSort('sold')
            })}
            onClick={() => handleSortClick('sold')}
          >
            {t('Sort.sell')}
          </Button>
        </div>
        <Popover
          placementMode='bottom'
          element={
            <div
              className={classNames(
                'flex w-[200px] items-center justify-between rounded-sm bg-white px-3 py-2 shadow',
                {
                  'text-orange': isActiveSort('price'),
                  'text-gray-700': !isActiveSort('price')
                }
              )}
            >
              <span>{t('Sort.price by.price')}</span>
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
          <div className='text-light w-[200px] bg-white px-3 py-4 text-base text-gray-700 shadow'>
            <button
              className='flex w-full items-center justify-between hover:text-orange'
              onClick={() => handleSortClick('price', 'asc')}
            >
              <span>
                {t('Sort.price by.price')}: {t('Sort.price by.low')}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className={classNames('h-4 w-4 text-orange', {
                  'inline-block': isActiveSort('price') && isActiveOrder('asc'),
                  hidden: !(isActiveSort('price') && isActiveOrder('asc'))
                })}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
              </svg>
            </button>
            <button
              className='mt-4 flex w-full items-center justify-between hover:text-orange'
              onClick={() => handleSortClick('price', 'desc')}
            >
              <span>
                {t('Sort.price by.price')}: {t('Sort.price by.high')}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className={classNames('h-4 w-4 text-orange', {
                  'inline-block': isActiveSort('price') && isActiveOrder('desc'),
                  hidden: !(isActiveSort('price') && isActiveOrder('desc'))
                })}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
              </svg>
            </button>
          </div>
        </Popover>
      </div>
      <div className='flex items-center gap-3'>
        <div className='text-sm text-gray-700'>
          <span className='text-orange'>{currentPage}</span>
          <span>/{pageSize}</span>
        </div>
        <div className='flex'>
          {currentPage === 1 ? (
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
          ) : (
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  page: (currentPage - 1).toString()
                }).toString()
              }}
              className='flex items-center justify-center rounded-sm border border-gray-300 bg-gray-bold p-3 shadow-sm duration-200 hover:bg-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3 text-gray-700'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Link>
          )}

          {currentPage === pageSize ? (
            <div className='flex items-center justify-center rounded-sm border border-gray-300 bg-white p-3 shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3 text-gray-400'
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
                  page: (currentPage + 1).toString()
                }).toString()
              }}
              className='flex items-center justify-center rounded-sm border border-gray-300 bg-gray-bold p-3 shadow-sm duration-200 hover:bg-white'
            >
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
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
