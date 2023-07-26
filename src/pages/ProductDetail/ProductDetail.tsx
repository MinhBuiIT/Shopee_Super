import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { convert } from 'html-to-text'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SEO from 'src/SEO'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import Product from 'src/components/Product'
import ProductRating from 'src/components/ProductRating'
import QuantityProduct from 'src/components/QuatityProduct/QuantityProduct'
import { PurchaseStatusConst } from 'src/contants/PurchaseStatus'
import { Path } from 'src/contants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductConfigParam } from 'src/types/product.type'
import { discountFunc, formatPrice, formatSold, getIdNameUrl } from 'src/utils/util'


export default function ProductDetail() {
  const queryClient = useQueryClient()
  const queryParam = useQueryConfig()
  const navigate = useNavigate()
  const [limitProducts, setLimitProducts] = useState(Number(queryParam.limit))
  const { nameId } = useParams()

  const id = getIdNameUrl(nameId as string)

  const [quantityProduct, setQuantityProduct] = useState<number>(1)
  const [sliderX, setSliderX] = useState<number>(0)
  const [imgActive, setImgActive] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const productQuery = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductItem(id as string),
    enabled: Boolean(id)
  })

  const queryConfig: ProductConfigParam = {
    limit: limitProducts.toString(),
    page: queryParam.page,
    category: productQuery.data?.data.data.category._id
  }

  const productsQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductConfigParam),
    enabled: Boolean(productQuery.data),
    staleTime: 3 * 60 * 1000
  })

  const purchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  })

  const handleAddToCart = () => {
    purchaseMutation.mutate(
      { product_id: id as string, buy_count: quantityProduct },
      {
        onSuccess: () => {
          setIsOpenModal(true)
          queryClient.invalidateQueries(['purchases', { status: PurchaseStatusConst.inCart }])
        }
      }
    )
  }

  const renderAddProductCanLike = () => {
    setLimitProducts((pre) => {
      return pre + 10
    })
  }

  const data = productQuery.data?.data.data
  const imgElement = useRef<HTMLImageElement>(null)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isOpenModal) {
      timer = setTimeout(() => {
        setIsOpenModal(false)
      }, 2000)
    }
    if (data) {
      setImgActive(data.images[0])
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [data, isOpenModal])

  const handleNextSiler = () => {
    if (data) {
      const numberHidden = data.images.length - 5
      if (sliderX / -20 < numberHidden) {
        setSliderX((pre) => pre - 20)
      }
    }
  }
  const handleaPreSlider = () => {
    if (data) {
      if (sliderX !== 0) {
        setSliderX((pre) => pre + 20)
      }
    }
  }
  const handleActiveImg = (img: string) => {
    setImgActive(img)
  }
  const hanldeZoomImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const img = imgElement.current as HTMLImageElement
    const { clientWidth, clientHeight } = e.currentTarget
    const { naturalWidth, naturalHeight } = img
    const { x, y } = e.currentTarget.getBoundingClientRect()
    const offsetY = e.pageY - (y + window.scrollY)
    const offsetX = e.pageX - (x + window.scrollX)
    const top = offsetY * (1 - naturalHeight / clientWidth)
    const left = offsetX * (1 - naturalHeight / clientHeight)
    img.style.width = naturalWidth + 'px'
    img.style.height = naturalHeight + 'px'
    img.style.maxWidth = 'unset'
    img.style.top = top + 'px'
    img.style.left = left + 'px'
  }
  const hanldeLeaveZoom = () => {
    const img = imgElement.current as HTMLImageElement
    img.removeAttribute('style')
  }
  const handleChangeQuantity = (value: number) => {
    setQuantityProduct(value)
  }
  const handleBuyNow = async () => {
    await purchaseMutation.mutateAsync({ product_id: id as string, buy_count: quantityProduct })
    navigate(`/${Path.cart}`, {
      state: {
        id
      }
    })
  }
  if (!data) return null
  return (
    <div className='w-full bg-gray-100 pt-6'>
      <SEO
        title={data.name}
        description={convert(data.description).slice(0, 100).trim()}
        name='Minh Bui'
        type='summary'
        img={data.image}
      />
      <div className='container rounded-sm bg-white p-3'>
        <div className='grid w-full grid-cols-12 gap-8'>
          <div className='col-span-4'>
            <div
              className='relative cursor-zoom-in overflow-hidden pt-[100%]'
              onMouseMove={hanldeZoomImg}
              onMouseLeave={hanldeLeaveZoom}
            >
              <img src={imgActive} alt={data.name} className='absolute left-0 top-0 object-cover' ref={imgElement} />
            </div>

            <div className='relative mt-3 w-full'>
              <button
                className='absolute left-0 top-1/2 z-10 flex h-8 w-8 translate-y-[-50%] items-center justify-center rounded-full bg-[rgba(135,136,137,0.3)] text-white'
                onClick={handleaPreSlider}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6 font-bold '
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
              <div className='relative overflow-hidden'>
                <div
                  className={`relative flex gap-1 transition-all duration-500`}
                  style={{ transform: `translateX(${sliderX}%)` }}
                >
                  {data.images.map((img) => {
                    const isActive = img === imgActive
                    return (
                      <div
                        className='relative w-[19%] flex-shrink-0 cursor-pointer'
                        key={img}
                        onMouseEnter={() => handleActiveImg(img)}
                      >
                        <div className='relative overflow-hidden pt-[100%]'>
                          <img src={img} alt={data.name} className='absolute left-0 top-0 object-cover' />
                        </div>
                        {isActive && (
                          <div className='absolute left-0 top-0 h-full w-full border-[2px] border-orange bg-transparent'></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <button
                className='absolute right-0 top-1/2 z-10 flex h-8 w-8 translate-y-[-50%] items-center justify-center rounded-full bg-[rgba(135,136,137,0.3)] text-white'
                onClick={handleNextSiler}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
          <div className='col-span-8'>
            <h1 className='text-light text-xl text-gray-700'>{data.name}</h1>
            <div className='mt-2 flex items-center'>
              <div className='flex items-center gap-2'>
                <span className='text-light border-b-[1px] border-orange pb-[2px] text-base text-orange'>
                  {data.rating}
                </span>
                <div>
                  <ProductRating
                    classNameStar='w-4 h-4 fill-orange'
                    rating={data.rating}
                    classNameStarHidden='w-4 h-4 stroke-orange fill-transparent'
                  />
                </div>
              </div>
              <div className='mx-5 h-6 w-[1px] bg-slate-400'></div>
              <div className='text-base font-light text-black'>
                {formatSold(data.sold)} <span className='text-[15px] text-gray-600'>Đã Bán</span>
              </div>
            </div>
            <div className='mt-4 flex items-center bg-gray-light px-4 py-3'>
              <div className='text-base font-light text-gray-500 line-through'>
                ₫{formatPrice(data.price_before_discount)}
              </div>
              <div className='ml-3 flex items-center text-[30px] text-orange'>
                <span>₫{formatPrice(data.price)}</span>
              </div>
              <div className='ml-4 inline-block rounded-sm bg-orange px-1 text-xs font-bold uppercase text-white'>
                {discountFunc(data.price_before_discount, data.price)}% GIẢM
              </div>
            </div>
            <div className='relative mt-8 flex items-center'>
              <span className='mr-12 text-base font-light capitalize text-gray-500'>Số lượng</span>
              <QuantityProduct
                onDecrease={handleChangeQuantity}
                onIncrease={handleChangeQuantity}
                onRevise={handleChangeQuantity}
                max={data.quantity}
                value={quantityProduct}
                showMessage={true}
              />
              <span className='ml-5 text-sm font-light capitalize text-gray-500'>{data.quantity} sản phẩm có sẵn</span>
            </div>
            <div className='mt-14 flex items-end gap-4'>
              <Button
                className='flex flex-shrink-0 items-center gap-2 rounded-sm border-[1px] border-orange bg-orange-light/10 px-5 py-3 text-center text-base font-light capitalize text-orange outline-none hover:opacity-80'
                onClick={handleAddToCart}
              >
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
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>

                <span>Thêm Vào Giỏ Hàng</span>
              </Button>
              <Button addClass='inline-block max-w-fit px-5 py-3' onClick={handleBuyNow}>
                Mua Ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-3 rounded-sm bg-white p-4 pb-8'>
        <h2 className='rounded-sm bg-gray-light px-3 py-2 text-left text-lg font-light uppercase text-gray-600'>
          Mô tả sản phẩm
        </h2>
        <div
          className='mt-3 pl-3 text-base font-light text-gray-600'
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
        ></div>
      </div>
      {productsQuery.data && (
        <div className='container mt-3 rounded-sm bg-white p-4 pb-8'>
          <h2 className='rounded-sm bg-gray-light px-3 py-2 text-left text-lg font-light uppercase text-gray-600'>
            Có thể bạn cũng thích
          </h2>
          <div className='mt-3 grid grid-cols-12 gap-2'>
            {productsQuery.data.data.data.products.map((product) => {
              return (
                <div key={product._id} className='col-span-6 mt-3 md:col-span-3 lg:col-span-2'>
                  <Product product={product} />
                </div>
              )
            })}
          </div>
          {productsQuery.data.data.data.pagination.page_size >= 2 && (
            <div className='mt-6 flex items-center justify-center'>
              <Button addClass='w-fit px-3 py-2' onClick={renderAddProductCanLike}>
                Xem Thêm
              </Button>
            </div>
          )}
        </div>
      )}

      {isOpenModal && (
        <Modal
          text='Sản Phẩm Đã Được Thêm Vào Giỏ Hàng'
          iconElement={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 text-white'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
            </svg>
          }
          isSuccess
        />
      )}
    </div>
  )
}
