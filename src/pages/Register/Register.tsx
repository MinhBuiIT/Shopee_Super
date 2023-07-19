import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResYup, schemaRes } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isUnprocessableEntityErr } from 'src/utils/util'
import { ErrorType } from 'src/types/ErrorType.type'
import { useContext } from 'react'
import { AuthConext } from 'src/contexts/AppContextAuth'
import Button from 'src/components/Button'

const schemaResgister = schemaRes.pick(['password', 'confirmPassword', 'email'])
type FormResgister = Pick<ResYup, 'confirmPassword' | 'email' | 'password'>
export default function Register() {
  const { setIsAuthentication, setProfile } = useContext(AuthConext)
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<FormResgister>({
    resolver: yupResolver(schemaResgister)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<ResYup, 'confirmPassword'>) => authApi.registerPost(body)
  })
  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthentication(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (err) => {
        if (isUnprocessableEntityErr<ErrorType>(err)) {
          const formError = err.response?.data
          if (formError !== undefined) {
            Object.keys(formError.data).forEach((key) => {
              setError(key as keyof Omit<FormResgister, 'confirmPassword'>, {
                type: 'server',
                message: formError?.data[key as keyof Omit<ResYup, 'confirmPassword'>]
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className=' bg-orange py-10'>
      <div className='container grid grid-cols-1 md:grid-cols-10'>
        <div className='col-span-4 hidden items-center justify-center text-7xl font-medium text-white md:flex'>
          Shopee
        </div>
        <div className='col-span-4 md:col-start-6 lg:col-start-7'>
          <form className='rounded bg-white px-8 py-6' onSubmit={onSubmit}>
            <h3 className='text-lg'>Đăng Ký</h3>
            <Input
              className='mt-8 w-full'
              type='text'
              placeholder='Email'
              register={register}
              label='email'
              errors={errors.email?.message}
            />
            <Input
              className='mt-3 w-full'
              type='password'
              placeholder='Mật khẩu'
              label='password'
              register={register}
              errors={errors.password?.message}
            />
            <Input
              className='mt-3 w-full'
              type='password'
              placeholder='Nhập lại mật khẩu'
              register={register}
              label='confirmPassword'
              errors={errors.confirmPassword?.message}
            />
            <div className='mt-4 w-full'>
              <Button
                className='flex w-full items-center justify-center rounded-sm bg-orange py-3 text-center text-base font-normal uppercase text-white hover:opacity-90'
                type='submit'
                isLoading={registerMutation.isLoading}
              >
                Đăng ký
              </Button>
            </div>
            <div className='mt-4 text-center text-sm text-gray-400'>
              Bạn đã có tài khoản?{' '}
              <Link to='/login' className='text-orange'>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
