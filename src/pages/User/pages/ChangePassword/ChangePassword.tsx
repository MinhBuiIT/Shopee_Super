import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi, { UserUpdateType } from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ResponseType } from 'src/types/Response.type'
import { schemaUser, schemaUserType } from 'src/utils/rules'
import { isUnprocessableEntityErr } from 'src/utils/util'

type FormChangePassword = {
  [key in keyof Pick<schemaUserType, 'password' | 'new_password' | 'confirmPassword'>]: string
}
const schemaChangePassword = schemaUser.pick(['password', 'new_password', 'confirmPassword'])
export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormChangePassword>({
    defaultValues: {
      password: '',
      confirmPassword: '',
      new_password: ''
    },
    resolver: yupResolver(schemaChangePassword)
  })
  const updateUserMutation = useMutation({
    mutationFn: (body: UserUpdateType) => userApi.updateMe(body)
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const dataConfig = omit(data, 'confirmPassword')
      const res = await updateUserMutation.mutateAsync(dataConfig)
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isUnprocessableEntityErr<ResponseType<Omit<FormChangePassword, 'confirmPassword'>>>(error)) {
        const errorObj = error.response?.data.data
        if (errorObj !== undefined) {
          Object.keys(errorObj).forEach((key) => {
            setError(key as keyof Omit<FormChangePassword, 'confirmPassword'>, {
              type: 'server',
              message: errorObj[key as keyof Omit<FormChangePassword, 'confirmPassword'>]
            })
          })
        }
      }
    }
  })
  return (
    <div className='mt-8 rounded-sm border-[1px] border-gray-200 bg-white px-5 pb-10 pt-4 shadow md:mt-0'>
      <div className='border-b-[1px] border-gray-200 pb-3'>
        <div className='text-lg font-light capitalize text-gray-800'>hồ sơ của tôi</div>
        <p className='mt-[2px] text-sm font-light text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className=' pt-5'>
        <form className='flex flex-col-reverse md:flex-row' id='form-user' onSubmit={onSubmit}>
          <div className=' md:mt-0 md:w-[80%] md:pr-10'>
            <div>
              <div className='mt-5 flex flex-col sm:mt-5 sm:flex-row sm:items-center'>
                <div className='mb-2 truncate text-sm font-light capitalize text-gray-600 sm:mb-0 sm:w-[20%] sm:text-right'>
                  Mật Khẩu
                </div>
                <Input
                  classNameInput='px-[8px] py-[8px]  w-[100%]'
                  className='sm:ml-5 sm:w-[80%]'
                  register={register}
                  label='password'
                  type='password'
                  placeholder='Mật Khẩu'
                  errors={errors.password?.message}
                />
              </div>
              <div className='mt-5 flex flex-col sm:mt-5 sm:flex-row sm:items-center'>
                <div className='mb-2 truncate text-sm font-light capitalize text-gray-600 sm:mb-0 sm:w-[20%] sm:text-right'>
                  Mật Khẩu Mới
                </div>
                <Input
                  classNameInput='px-[8px] py-[8px]  w-[100%]'
                  className='mt-3 sm:ml-5 sm:w-[80%]'
                  register={register}
                  label='new_password'
                  type='password'
                  placeholder='Mật Khẩu Mới'
                  errors={errors.new_password?.message}
                />
              </div>
              <div className='mt-5 flex flex-col sm:mt-5 sm:flex-row sm:items-center'>
                <div className='mb-2 truncate text-sm font-light capitalize text-gray-600 sm:mb-0 sm:w-[20%] sm:text-right'>
                  Xác nhận mật khẩu{' '}
                </div>
                <Input
                  classNameInput='px-[8px] py-[8px]  w-[100%]'
                  className='mt-3 sm:ml-5 sm:w-[80%]'
                  register={register}
                  type='password'
                  label='confirmPassword'
                  placeholder='Xác nhận mật khẩu'
                  errors={errors.confirmPassword?.message}
                />
              </div>

              <div className='mt-5 flex flex-col sm:mt-8 sm:flex-row sm:items-center'>
                <div className='truncate text-sm font-light capitalize text-gray-600 sm:w-[20%] sm:text-right' />
                <Button
                  addClass='py-2 px-6 md:py-2 w-fit md:px-4 sm:ml-5 capitalize text-sm'
                  type='submit'
                  form='form-user'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
