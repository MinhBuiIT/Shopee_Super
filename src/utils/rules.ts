import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
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
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp')
})
export type ResYup = yup.InferType<typeof schemaRes>
export const schemaLogin = schemaRes.omit(['confirmPassword'])
export type LoginYup = yup.InferType<typeof schemaLogin>
