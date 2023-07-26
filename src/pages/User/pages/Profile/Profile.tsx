import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import userApi, { UserUpdateType } from 'src/apis/user.api'
import Button from 'src/components/Button'
import InputFile from 'src/components/InputFile'
import { AuthConext } from 'src/contexts/AppContextAuth'
import { ResponseType } from 'src/types/Response.type'
import { saveUserTKToLC } from 'src/utils/authLocal'
import { schemaUser, schemaUserType } from 'src/utils/rules'
import { createLinkAvt, isUnprocessableEntityErr } from 'src/utils/util'
import DateRender from '../../DateRender'
import Infor from '../../Infor'

type FormProfile = Pick<schemaUserType, 'address' | 'avatar' | 'date_of_birth' | 'name' | 'phone'>
type FormErrProfile = Omit<FormProfile, 'date_of_birth'> & {
  date_of_birth: string
}

const schemaUserForm = schemaUser.pick(['address', 'avatar', 'date_of_birth', 'name', 'phone'])
export default function Profile() {
  const { setProfile } = useContext(AuthConext)
  const { t } = useTranslation('user')

  const queryClient = useQueryClient()
  const [file, setFile] = useState<File | null>(null)
  const previewAvt = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const method = useForm<FormProfile>({
    defaultValues: {
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1),
      name: '',
      phone: ''
    },
    resolver: yupResolver(schemaUserForm)
  })
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    setValue
  } = method
  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getMe
  })
  const avatarValue = watch('avatar')

  const userData = getUserQuery.data?.data
  const updateMeMutation = useMutation({
    mutationFn: (body: UserUpdateType) => userApi.updateMe(body)
  })
  const uploadAvtMutation = useMutation({
    mutationFn: (body: FormData) => userApi.uploadAvatar(body)
  })

  useEffect(() => {
    if (userData) {
      const { address, avatar, date_of_birth, name, phone } = userData.data

      setValue('address', address)
      setValue('avatar', avatar)
      setValue('date_of_birth', date_of_birth ? new Date(date_of_birth) : new Date(1990, 0, 1))
      setValue('name', name)
      setValue('phone', phone)
    }
  }, [userData, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName
      if (file) {
        const formAvt = new FormData()
        formAvt.append('image', file)
        const resAvt = await uploadAvtMutation.mutateAsync(formAvt)
        setValue('avatar', resAvt.data.data)
        setFile(null)
        avatarName = resAvt.data.data
      }
      const dataUpdate = { ...data, date_of_birth: data.date_of_birth?.toISOString(), avatar: avatarName }
      const resUpdate = await updateMeMutation.mutateAsync(dataUpdate)
      const dataRes = resUpdate
      saveUserTKToLC(JSON.stringify(dataRes.data.data))
      setProfile(dataRes.data.data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch (error) {
      if (isUnprocessableEntityErr<ResponseType<FormErrProfile>>(error)) {
        const errorObj = error.response?.data.data
        if (errorObj !== undefined) {
          Object.keys(errorObj).forEach((key) => {
            setError(key as keyof FormErrProfile, {
              type: 'server',
              message: errorObj[key as keyof FormErrProfile]
            })
          })
        }
      }
    }
  })

  const handleChangeInputFile = (file: File) => {
    setFile(file)
  }
  return (
    <div className='mt-8 rounded-sm border-[1px] border-gray-200 bg-white px-5 pb-10 pt-4 shadow md:mt-0'>
      <div className='border-b-[1px] border-gray-200 pb-3'>
        <div className='text-lg font-light capitalize text-gray-800'>{t('my profile')}</div>
        <p className='mt-[2px] text-sm font-light text-gray-600'>{t('my profile des')}</p>
      </div>
      {userData && (
        <div className=' pt-5'>
          <FormProvider {...method}>
            <form className='flex flex-col-reverse md:flex-row' id='form-user' onSubmit={onSubmit}>
              <div className='mt-5 md:mt-0 md:w-[68%] md:pr-10'>
                <div className='flex flex-col sm:flex-row sm:items-center'>
                  <div className='truncate text-sm font-light capitalize text-gray-600 sm:w-[20%] sm:text-right'>
                    Email
                  </div>
                  <div className='mt-1 font-light text-black  sm:ml-5 sm:mt-0 sm:w-[80%]'>{userData?.data.email}</div>
                </div>
                <div>
                  <Infor />
                  <Controller
                    control={control}
                    name='date_of_birth'
                    render={({ field }) => {
                      // console.log('field', field.value)

                      return (
                        <DateRender
                          onChange={field.onChange}
                          value={field.value}
                          errors={errors.date_of_birth?.message}
                          label={t('form.date')}
                        />
                      )
                    }}
                  />

                  <div className='mt-3 flex flex-col sm:mt-3 sm:flex-row sm:items-center'>
                    <div className='truncate text-sm font-light capitalize text-gray-600 sm:w-[20%] sm:text-right' />
                    <Button
                      addClass='py-2 px-6 md:py-2 w-fit md:px-4 sm:ml-5 capitalize text-sm'
                      type='submit'
                      form='form-user'
                    >
                      {t('form.save')}
                    </Button>
                  </div>
                </div>
              </div>
              <div className='sm:border-l-[1px] sm:border-gray-200 md:w-[34%] '>
                <div className='flex justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <div className='flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full border-[1px] border-gray-300 shadow'>
                      {file || avatarValue ? (
                        <img
                          src={previewAvt || createLinkAvt(avatarValue)}
                          alt='Avatar'
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <svg
                          enableBackground='new 0 0 15 15'
                          viewBox='0 0 15 15'
                          x={0}
                          y={0}
                          className=' h-[50px] w-[50px] stroke-[#c6c6c6]'
                        >
                          <g>
                            <circle cx='7.5' cy='4.5' fill='none' r='3.8' strokeMiterlimit={10} />
                            <path
                              d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
                              fill='none'
                              strokeLinecap='round'
                              strokeMiterlimit={10}
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                    <div className='text-center'>
                      <InputFile onChange={handleChangeInputFile} textBtn={t('choose avt')} />
                      <div className='mt-3 text-sm font-light text-gray-400'>
                        <div>{t('max size avt')} 1 MB</div>
                        <div>{t('format')}:.JPEG, .PNG</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </div>
  )
}
