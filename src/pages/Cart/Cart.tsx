import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SEO from 'src/SEO'
import purchaseApi from 'src/apis/purchase.api'
import img from 'src/assets'
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import QuantityProduct from 'src/components/QuatityProduct/QuantityProduct'
import { PurchaseStatusConst } from 'src/contants/PurchaseStatus'
import { PurchaseType } from 'src/types/purchase.type'
import { formatPrice, formatSold, removeSpecialCharacter } from 'src/utils/util'

interface ExtendedPurchase extends PurchaseType {
  checked: boolean
  disable: boolean
}
export default function Cart() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isBuySucess, setIsBuySuccess] = useState(false)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const location = useLocation()
  // console.log(location)

  const idBuyNow = (location.state as { id: string })?.id
  // console.log(idBuyNow)

  const { data: purchases, refetch: getPurchaseRefetch } = useQuery({
    queryKey: ['purchases', { status: PurchaseStatusConst.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchaseStatusConst.inCart })
  })
  const updatePurchase = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.updatePurchase(body),
    onSuccess: () => {
      getPurchaseRefetch()
    }
  })
  const deletePurchase = useMutation({
    mutationFn: (body: string[]) => purchaseApi.deletePurchase(body),
    onSuccess: () => {
      getPurchaseRefetch()
    }
  })
  const buyPurchase = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => {
      return purchaseApi.buyProducts(body)
    },
    onSuccess: () => {
      getPurchaseRefetch()
    }
  })

  const purchasesData = purchases?.data.data
  const { isCheckedAllPurchase, purchasesChecked } = useMemo(() => {
    return {
      isCheckedAllPurchase:
        extendedPurchase.length !== 0 ? extendedPurchase.every((purchase) => purchase.checked) : false,
      purchasesChecked: extendedPurchase.filter((purchare) => {
        return purchare.checked
      })
    }
  }, [extendedPurchase])
  const { totalPriceBuy, totalPriceSaving } = useMemo(() => {
    return {
      totalPriceBuy: extendedPurchase.reduce((pre, current) => {
        if (current.checked) {
          return pre + current.price * current.buy_count
        }
        return pre
      }, 0),
      totalPriceSaving: extendedPurchase.reduce((pre, current) => {
        if (current.checked) {
          console.log(current)

          return pre + (current.price_before_discount - current.price) * current.buy_count
        }
        return pre
      }, 0)
    }
  }, [extendedPurchase])

  useEffect(() => {
    if (isOpenModal) {
      setTimeout(() => {
        setIsOpenModal(false)
      }, 1500)
    }
    if (isBuySucess) {
      setTimeout(() => {
        setIsBuySuccess(false)
      }, 1500)
    }
    if (purchasesData) {
      setExtendedPurchase((pre) => {
        return purchasesData.map((purchase) => {
          const indexId = pre.findIndex((item) => item._id === purchase._id)
          return {
            ...purchase,
            checked: Boolean(pre[indexId]?.checked) || Boolean(purchase.product._id === idBuyNow),
            disable: false
          }
        })
      })
    }
  }, [purchasesData, isOpenModal, isBuySucess, idBuyNow])
  useEffect(() => {
    return () => {
      window.history.replaceState({}, '')
    }
  }, [])
  const handleChecked = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draftState) => {
        draftState[index].checked = e.target.checked
      })
    )
  }
  const handleCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedStateAll = extendedPurchase.map((purchase) => {
      return { ...purchase, checked: e.target.checked }
    })

    setExtendedPurchase(checkedStateAll)
  }
  const handleChangeCountPro = (index: number) => (value: number) => {
    const { _id } = extendedPurchase[index].product
    setExtendedPurchase(
      produce((draft) => {
        draft[index].disable = true
      })
    )
    updatePurchase.mutate({ product_id: _id, buy_count: value || 1 })
  }
  const handleDeleteOneProduct = (index: number) => () => {
    const { _id } = extendedPurchase[index]
    deletePurchase.mutate([_id])
  }
  const handleDeleteSomeProduct = () => {
    const idArrChecked = purchasesChecked.map((purchase) => {
      return purchase._id
    })
    deletePurchase.mutate(idArrChecked)
  }
  const handleBuyPurchase = () => {
    const body = purchasesChecked.map((purchase) => {
      return {
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }
    })
    if (body.length !== 0) {
      buyPurchase.mutate(body)
      setIsBuySuccess(true)
    } else {
      setIsOpenModal(true)
    }
  }
  return (
    <div className='bg-gray-light py-6'>
      <SEO
        title='Giỏ Hàng'
        description='Đặt hàng để nhập nhiều ưu đãi'
        name='Minh Bui'
        type='summary'
        img={img.Shopee}
      />
      <div className='overflow-auto '>
        <div className='container min-w-[1000px]'>
          <div className='rounded-sm bg-white px-8 py-4 text-sm font-light capitalize shadow'>
            <div className='grid grid-cols-12'>
              <div className='col-span-6 '>
                <div className='flex items-center gap-3'>
                  <div className='flex flex-shrink-0 items-center justify-center'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 accent-orange'
                      onChange={(e) => handleCheckedAll(e)}
                      checked={isCheckedAllPurchase}
                    />
                  </div>
                  <div className='mt-[2px] flex-grow'>Sản Phẩm</div>
                </div>
              </div>
              <div className='col-span-6 grid grid-cols-5 place-items-center text-gray-500'>
                <div className='col-span-2 '>Đơn giá</div>
                <div className='col-span-1'>Số Lượng</div>
                <div className='col-span-1'>Số tiền</div>
                <div className='col-span-1'>Thao tác</div>
              </div>
            </div>
          </div>
          {extendedPurchase.length !== 0 && (
            <div className='mt-2 rounded-sm bg-white px-4 py-6 text-sm shadow'>
              {extendedPurchase.map((data, index) => {
                return (
                  <div
                    key={data._id}
                    className='mt-4 grid grid-cols-12 rounded-sm border-[1px] px-4  py-6 shadow-sm first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className=' flex items-center  '>
                        <div className='flex flex-shrink-0 items-center justify-center'>
                          <input
                            type='checkbox'
                            className='h-4 w-4 accent-orange'
                            onChange={handleChecked(index)}
                            checked={data.checked}
                          />
                        </div>
                        <div className='ml-6 flex items-start'>
                          <Link
                            title={data.product.name}
                            to={`/${removeSpecialCharacter(data.product.name)}-i.${data.product._id}`}
                            className='relative  w-[90px] overflow-hidden '
                          >
                            <div className='pt-[100%]'>
                              <img
                                src={data.product.image}
                                alt={data.product.name}
                                className='absolute left-0 top-0 object-cover'
                              />
                            </div>
                          </Link>
                          <Link
                            title={data.product.name}
                            to={`/${removeSpecialCharacter(data.product.name)}-i.${data.product._id}`}
                            className='ml-[6px] mt-1 max-w-[240px] text-black line-clamp-2'
                          >
                            {data.product.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid h-full grid-cols-5 place-items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center gap-2 text-center '>
                            <span className='text-sm text-gray-500 line-through'>
                              ₫{formatPrice(data.product.price_before_discount)}
                            </span>
                            <span className='text-sm text-black'>₫{formatPrice(data.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityProduct
                            value={data.buy_count}
                            disabled={data.disable}
                            max={data.product.quantity}
                            onIncrease={handleChangeCountPro(index)}
                            onDecrease={handleChangeCountPro(index)}
                            onFocusOut={handleChangeCountPro(index)}
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>₫{formatPrice(data.product.price * data.buy_count)}</span>
                        </div>
                        <div className='col-span-1'>
                          <Button
                            className='bg-none text-gray-700 hover:text-orange'
                            onClick={handleDeleteOneProduct(index)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <div className='sticky bottom-0 mt-4'>
        <div className='container '>
          <div className='grid grid-cols-12 rounded-sm bg-white px-8 py-6 shadow-md'>
            <div className='col-span-12 md:col-span-6'>
              <div className='flex items-center gap-4'>
                <div className='flex flex-shrink-0 items-center justify-center'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 accent-orange'
                    onChange={handleCheckedAll}
                    id='checkedAll'
                    checked={isCheckedAllPurchase}
                  />
                </div>
                <label
                  htmlFor='checkedAll'
                  className='cursor-pointer bg-none text-base font-light capitalize text-black'
                >
                  Chọn tất cả ({extendedPurchase.length})
                </label>
                <Button className='bg-none text-base capitalize text-black' onClick={handleDeleteSomeProduct}>
                  Xóa
                </Button>
              </div>
            </div>
            <div className='col-span-12 mt-2 md:col-span-6 md:mt-0'>
              <div className='flex flex-col sm:flex-row'>
                <div className='flex items-start md:ml-auto'>
                  <p className='mt-1 text-black'>Tổng thanh toán ({purchasesChecked.length} sản phẩm):</p>
                  <div className='ml-2'>
                    <div className='text-2xl font-normal text-orange'>₫{formatPrice(totalPriceBuy)}</div>
                    {totalPriceSaving !== 0 && (
                      <div className='flex items-end justify-around text-[12px]'>
                        <span>Tiết kiệm:</span>
                        <span className='text-orange '>₫{formatSold(totalPriceSaving)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  addClass='ml-3 flex-grow capitalize py-2 mt-2 sm:mt-0 flex-shrink-0 md:max-w-[36%] max-w-[100%] md:ml-auto'
                  onClick={handleBuyPurchase}
                >
                  Mua Hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          text='Bạn chưa chọn hàng thanh toán'
          iconElement={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          }
          isSuccess={false}
        />
      )}
      {isBuySucess && (
        <Modal
          text='Mua thành công'
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
          isSuccess={true}
        />
      )}
    </div>
  )
}
