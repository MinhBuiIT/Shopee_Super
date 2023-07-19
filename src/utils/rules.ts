import type { RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

export type RulesType = {
  [key in 'email' | 'password' | 'confirmPassword']?: RegisterOptions
}

// export const rulesFunc = (getValues?: UseFormGetValues<any>): RulesType => ({
//   email: {
//     required: 'Vui lòng nhập Email',
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Nhập email đúng định dạng'
//     },
//     minLength: {
//       value: 5,
//       message: 'Nhập từ 5 - 160 ký tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Nhập từ 5 - 160 ký tự'
//     }
//   },
//   password: {
//     required: 'Vui lòng nhập mật khẩu',
//     minLength: {
//       value: 6,
//       message: 'Nhập từ 6 - 160 ký tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Nhập từ 6 - 160 ký tự'
//     }
//   },
//   confirmPassword: {
//     required: 'Vui lòng nhập lại mật khẩu',
//     validate: (v) => {
//       if (typeof getValues === 'function') return v === getValues('password') || 'Mật khẩu không trùng khớp'
//       else return undefined
//     }
//   }
// })
const handlConfirm = (refString: string) => {
  return yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref(refString)], 'Mật khẩu không trùng khớp')
}
export const schemaRes = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập Email')
    .email('Nhập email đúng định dạng')
    .min(5, 'Nhập từ 5 - 160 ký tự')
    .max(160, 'Nhập từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Nhập từ 6 - 160 ký tự')
    .max(160, 'Nhập từ 6 - 160 ký tự'),
  confirmPassword: handlConfirm('password'),
  price_min: yup.string().test({
    name: 'price_not_alowed',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: testFunc
  }),
  price_max: yup.string().test({
    name: 'price_not_alowed',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: testFunc
  }),
  search: yup.string().trim()
})
function testFunc(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent
  if (Number(price_max) === 0 && price_max !== '') return false
  if (price_min !== '' && price_min !== undefined && price_max !== '') return Number(price_max) > Number(price_min)
  return price_max !== '' || price_min !== ''
}
export type ResYup = yup.InferType<typeof schemaRes>
export const schemaLogin = schemaRes.pick(['email', 'password'])
export type LoginYup = yup.InferType<typeof schemaLogin>
export const schemaPrice = schemaRes.pick(['price_max', 'price_min'])
export type PriceType = yup.InferType<typeof schemaPrice>
export const schemaSearch = schemaRes.pick(['search'])
export type SchemaSearchType = yup.InferType<typeof schemaSearch>

// user
export const schemaUser = yup.object({
  name: yup.string().max(160, 'Tối đa 160 ký tự'),
  phone: yup.string().max(20, 'Tối đa 20 ký tự'),
  address: yup.string().max(160, 'Tối đa 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Vui lòng chọn ngày phù hợp'),
  avatar: yup.string().max(1000, 'Tối đa 1000 ký tự'),
  password: schemaRes.fields['password'],
  new_password: schemaRes.fields.password,
  confirmPassword: handlConfirm('new_password')
})
export type schemaUserType = yup.InferType<typeof schemaUser>
