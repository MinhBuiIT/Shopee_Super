import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  register?: UseFormRegister<any>
  label?: 'email' | 'password' | 'confirmPassword'
  errors?: string
}
export default function Input({ className, label, register, errors, ...rest }: Props) {
  return (
    <div className={className || ''}>
      {register && label ? (
        <input
          {...rest}
          className='w-full rounded-sm border border-solid border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-700 focus:shadow'
          {...register(label)}
        />
      ) : (
        <input
          {...rest}
          className='w-full rounded-sm border border-solid border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-700 focus:shadow'
        />
      )}

      <p className='mt-1 min-h-[1.25rem] text-sm font-thin text-red-400'>{errors}</p>
    </div>
  )
}
