import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavLink, createSearchParams, useNavigate } from 'react-router-dom'
import { categoriesApi } from 'src/apis/categories.api'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import { PriceType, schemaPrice } from 'src/utils/rules'
import { WithoutNullableKeys } from 'src/utils/util'
import Button from '../Button'
import InputNumber from '../InputNumber'
import InputV2 from '../InputV2'
import RatingStar from '../RatingStar'

type Props = {
  queryConfig: QueryConfig
}
export type FormPriceType = WithoutNullableKeys<PriceType>
export default function AsideFilter({ queryConfig }: Props) {
  const navigate = useNavigate()
  const categoryParam = queryConfig.category
  const categoryQuery = useQuery({
    queryKey: ['category'],
    queryFn: () => categoriesApi.getCategories()
  })
  const isCategoryActive = (id: string) => {
    return categoryParam === id
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue
  } = useForm<FormPriceType>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(schemaPrice)
  })
  const handleRemoveFilter = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit({ ...queryConfig }, ['category', 'rating_filter', 'price_max', 'price_min', 'sort_by', 'order'])
      ).toString()
    })
  }
  useEffect(() => {
    if (queryConfig) {
      setValue('price_min', queryConfig.price_min || '')
      setValue('price_max', queryConfig.price_max || '')
    }
  }, [queryConfig, setValue])
  const onSubmit = handleSubmit((data) => {
    const dataConfig = omitBy<string | number>(data, isEmpty)
    Object.keys(dataConfig).forEach((key) => {
      dataConfig[key] = Number(dataConfig[key])
    })

    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        ...dataConfig,
        page: '1'
      }).toString()
    })
  })
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
          <NavLink
            to={{
              pathname: '/',
              search: createSearchParams(
                omit(
                  {
                    ...queryConfig,
                    page: '1'
                  },
                  ['category']
                )
              ).toString()
            }}
            className={classNames(`relative mt-1 flex items-center px-3 py-1 text-sm`, {
              'font-semibold text-orange': categoryParam === undefined,
              'font-normal text-black': categoryParam !== undefined
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className={classNames('absolute left-0 h-3 w-3', {
                'inline-block': categoryParam === undefined,
                hidden: categoryParam !== undefined
              })}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>

            <span className='ml-2 capitalize'>Tất cả sản phẩm</span>
          </NavLink>
        </li>
        {categoryQuery.data &&
          categoryQuery.data.data.data.map((categoryItem) => {
            return (
              <li key={categoryItem._id}>
                <NavLink
                  to={{
                    pathname: '/',
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id,
                      page: '1'
                    }).toString()
                  }}
                  className={classNames(`relative mt-1 flex items-center px-3 py-1 text-sm`, {
                    ' font-semibold text-orange': isCategoryActive(categoryItem._id),
                    'font-normal text-black': !isCategoryActive(categoryItem._id)
                  })}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className={classNames('absolute left-0 h-3 w-3', {
                      'inline-block': isCategoryActive(categoryItem._id),
                      hidden: !isCategoryActive(categoryItem._id)
                    })}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>

                  <span className='ml-2 capitalize'>{categoryItem.name}</span>
                </NavLink>
              </li>
            )
          })}
      </ul>
      <div className='mt-5 h-[1px] w-[100%] bg-gray-300'></div>
      <div className='pt-4'>
        <p className='text-base font-light text-gray-700'>Khoảng Giá</p>
        <form className='mt-3' onSubmit={onSubmit}>
          <div className='flex items-center justify-between'>
            {/* <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  placeholder='₫ TỪ'
                  onChange={(e) => {
                    trigger('price_max')
                    field.onChange(e)
                  }}
                  value={field.value}
                  ref={field.ref}
                />
              )}
            /> */}
            <InputV2
              control={control}
              name='price_min'
              placeholder='₫ TỪ'
              type='number'
              onChange={() => {
                trigger('price_max')
              }}
            ></InputV2>
            <span className='h-[1px] w-[10%] bg-gray-300'></span>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  placeholder='₫ ĐẾN'
                  onChange={(e) => {
                    trigger('price_min')
                    field.onChange(e)
                  }}
                  value={field.value}
                  ref={field.ref}
                />
              )}
            />
          </div>
          <p className='text-light mt-1 min-h-[14px] text-xs text-red-400'>{errors.price_min?.message}</p>
          <Button addClass='py-[6px] mt-5 text-sm w-full' type='submit'>
            Áp Dụng
          </Button>
        </form>
      </div>
      <div className='mt-5 h-[1px] w-[100%] bg-gray-300'></div>
      <div className='pt-5'>
        <p className='text-base font-light text-gray-700'>Đánh giá</p>
        <RatingStar queryConfig={queryConfig} />
      </div>
      <div className='mt-5 h-[1px] w-[100%] bg-gray-300'></div>
      <Button addClass='py-[6px] mt-5 text-sm w-full' onClick={handleRemoveFilter}>
        Xóa Tất Cả
      </Button>
    </div>
  )
}
