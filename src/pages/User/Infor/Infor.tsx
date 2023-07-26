import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { schemaUserType } from 'src/utils/rules'

type FormProfile = Pick<schemaUserType, 'address' | 'avatar' | 'date_of_birth' | 'name' | 'phone'>
export default function Infor() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormProfile>()
  const { t } = useTranslation('user')
  return (
    <>
      <div className='mt-5 flex flex-col sm:mt-8 sm:flex-row sm:items-center'>
        <div className='truncate text-sm font-light capitalize text-gray-600 sm:w-[20%] sm:text-right'>
          {t('form.name')}
        </div>
        <Input
          classNameInput='px-[6px] py-[6px]  w-[100%]'
          className='sm:ml-5 sm:w-[80%]'
          register={register}
          label='name'
          placeholder={t('form.name')}
          errors={errors.name?.message}
        />
      </div>
      <div className='mt-5 flex flex-col sm:mt-6 sm:flex-row sm:items-center'>
        <div className='mb-[14px] truncate text-sm font-light capitalize text-gray-600 sm:w-[20%] sm:text-right'>
          {t('form.phone')}
        </div>
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <div className='sm:ml-5 sm:w-[80%]'>
              <InputNumber
                className='w-full rounded-sm border border-solid border-gray-400 px-[6px] py-[6px] text-sm text-gray-700 outline-none focus:border-gray-700 focus:shadow '
                onChange={field.onChange}
                value={field.value}
              />
              <p
                className={`mt-1 min-h-[14px] text-[13px] font-thin text-red-500 ${!errors.phone ? 'hidden' : 'block'}`}
              >
                {errors.phone?.message}
              </p>
            </div>
          )}
        />
      </div>
      <div className='mt-5 flex flex-col sm:mt-6 sm:flex-row sm:items-center'>
        <div className='truncate text-sm font-light capitalize text-gray-600 sm:w-[20%] sm:text-right'>
          {t('form.address')}
        </div>
        <Input
          classNameInput='px-[6px] py-[6px]  w-[100%]'
          className='sm:ml-5 sm:w-[80%]'
          register={register}
          label='address'
        />
      </div>
    </>
  )
}
