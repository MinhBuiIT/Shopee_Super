import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/contants/HttpStatus'
import { baseURL } from 'src/contants/link'

export const isAxiosErr = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
export const isUnprocessableEntityErr = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosErr(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE').format(price)
}
export const formatSold = (value: number) => {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value).replace('.', ',')
}
export const discountFunc = (prePrice: number, newPrice: number) => {
  return Math.round(((prePrice - newPrice) / prePrice) * 100)
}
export type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>
}
export const removeSpecialCharacter = (str: string) => {
  const noSpaceStr = str.replace(/\s-\s/g, '-')
  return noSpaceStr.replace(
    /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g,
    '+'
  )
}
export const getIdNameUrl = (url: string) => {
  const isCheck = url.includes('-i.')
  if (!isCheck) return false
  const arr = url.split('-i.')

  return arr[arr.length - 1]
}
export const createLinkAvt = (name?: string) => (name ? `${baseURL}images/${name}` : '')
