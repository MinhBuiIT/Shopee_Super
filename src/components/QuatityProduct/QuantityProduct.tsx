import { useState } from 'react'
import InputNumber from '../InputNumber'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onRevise?: (value: number) => void
  onFocusOut?: (value: number) => void
  value?: number
  customClass?: string
  max?: number
  showMessage?: boolean
}
const MES = 'Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này'
export default function QuantityProduct({
  onDecrease,
  onIncrease,
  onRevise,
  onFocusOut,
  customClass = 'flex',
  max,
  value,
  showMessage,
  disabled,
  ...rest
}: Props) {
  const [messageQuantity, setMessageQuantity] = useState<string>('')
  const [localValue, setLocalValue] = useState<number>(Number(value) || 1)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value
    setMessageQuantity('')
    if (max && value > max) {
      value = max
    } else if (value < 1) {
      value = 0
      setMessageQuantity(MES)
    }
    onRevise && onRevise(value)

    setLocalValue(value)
  }

  const handleIncrease = () => {
    let valueInput = onRevise && value ? Number(value) : localValue
    valueInput++
    setMessageQuantity('')
    if (max && valueInput > max) {
      valueInput = max
      setMessageQuantity(MES)
    }
    onIncrease && onIncrease(valueInput)
    setLocalValue(valueInput)
  }
  const handleDecrease = () => {
    let valueInput = onRevise && value ? Number(value) : localValue
    valueInput--
    setMessageQuantity('')
    if (valueInput < 1) {
      valueInput = 1
      setMessageQuantity(MES)
    }
    onDecrease && onDecrease(valueInput)
    setLocalValue(valueInput)
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(+e.target.value)
    if (+e.target.value === 0) setLocalValue(1)
  }
  return (
    <div>
      <div className={customClass}>
        <button
          onClick={handleDecrease}
          disabled={disabled}
          className='flex items-center justify-center rounded-bl-sm rounded-tl-sm border-[1px] border-slate-300 bg-white px-[6px] text-gray-600 outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
          </svg>
        </button>
        <InputNumber
          {...rest}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          value={onRevise ? value : localValue}
          className='w-[50px] border-[1px] border-slate-300 py-1 text-center text-gray-600 outline-none'
        />
        <button
          disabled={disabled}
          onClick={handleIncrease}
          className='flex items-center justify-center rounded-br-sm rounded-tr-sm border-[1px] border-slate-300 bg-white px-[6px] text-gray-600 outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
          </svg>
        </button>
      </div>
      {showMessage && (
        <div className='absolute left-0 mt-3 min-h-[16px] text-sm font-light text-red-500 '>{messageQuantity}</div>
      )}
    </div>
  )
}
