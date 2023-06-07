import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginPost } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { LoginYup, schemaLogin } from 'src/utils/rules'
import { isUnprocessableEntityErr } from 'src/utils/util'
import { ErrorType } from 'src/types/ErrorType.type'
import { useContext } from 'react'
import { AuthConext } from 'src/contexts/AppContextAuth'
import Button from 'src/components/Button'

export default function Login() {
  const { setIsAuthentication, setProfile } = useContext(AuthConext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginYup>({
    resolver: yupResolver(schemaLogin)
  })
  const loginMutation = useMutation({
    mutationFn: (body: LoginYup) => loginPost(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthentication(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isUnprocessableEntityErr<ErrorType>(error)) {
          const errorObj = error.response?.data.data
          if (errorObj !== undefined) {
            Object.keys(errorObj).forEach((key) => {
              setError(key as keyof LoginYup, {
                type: 'server',
                message: errorObj[key as keyof LoginYup]
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange py-10'>
      <div className=' container grid grid-cols-1 md:grid-cols-10'>
        <div className='col-span-4 hidden items-center justify-center text-7xl font-medium text-white md:flex'>
          Shopee
        </div>
        <div className='col-span-4 md:col-start-6 lg:col-start-7'>
          <form className='rounded bg-white px-8 py-6' onSubmit={onSubmit}>
            <h3 className='text-lg'>Đăng nhập</h3>
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
              placeholder='Mật Khẩu'
              register={register}
              label='password'
              errors={errors.password?.message}
            />
            <div className='mt-5 w-full'>
              <Button
                className='flex w-full items-center justify-center rounded-sm bg-orange py-3 text-center text-base font-normal uppercase text-white hover:opacity-90'
                type='submit'
                isLoading={loginMutation.isLoading}
              >
                Đăng nhập
              </Button>
            </div>
            <div className='mt-4 text-center text-sm text-gray-400'>
              Bạn mới biết đến Shopee?{' '}
              <Link to='/register' className='text-orange'>
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
