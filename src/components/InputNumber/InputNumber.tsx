import { forwardRef, useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputInnerNumber(
  { className, onChange, value, ...rest },
  ref
) {
  const [localValue, setLocalValue] = useState<number | string>((value as string) || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value || ''

    if (/^\d+$/.test(valueInput) || valueInput === '') {
      if (onChange) {
        onChange(e)
      } else setLocalValue(valueInput === '' ? '' : valueInput)
    }
  }

  return (
    <input
      {...rest}
      onChange={handleChange}
      ref={ref}
      value={onChange ? value : localValue}
      className={
        className ||
        'w-[40%] rounded-sm border border-solid border-gray-300 px-1 py-1 text-sm text-gray-500 outline-none'
      }
    />
  )
})
export default InputNumber
