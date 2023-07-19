import  range  from 'lodash/range'
import { useEffect, useState } from 'react'
interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errors?: string
}
export default function DateRender({ onChange, value, errors }: Props) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })
  // console.log('Date', date)

  // console.log('Value', value)
  useEffect(() => {
    if (value) {
      setDate({
        day: value.getDate(),
        month: value.getMonth() + 1,
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target

    const newDate = { ...date, [name]: +value }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, +newDate.month - 1, newDate.day))
  }

  return (
    <div className='mt-5 flex flex-col sm:mt-6 sm:flex-row sm:items-center'>
      <div className='truncate text-sm font-light capitalize text-gray-600 sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='mt-1 text-sm sm:ml-6 sm:mt-0 sm:w-[80%] '>
        <div className='flex'>
          <select
            className='w-[32%] cursor-pointer rounded-sm border-[1px] border-gray-400 px-[6px] py-[6px] outline-none hover:border-orange'
            name='day'
            onChange={handleChange}
            value={value ? +value.getDate() : date.day}
          >
            {range(1, 32).map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
          <select
            className='ml-2 w-[32%] cursor-pointer rounded-sm border-[1px] border-gray-400 px-[6px] py-[6px] outline-none hover:border-orange'
            name='month'
            onChange={handleChange}
            value={value ? +value.getMonth() + 1 : date.month}
          >
            {range(1, 13).map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
          <select
            className='ml-2 w-[32%] cursor-pointer rounded-sm border-[1px] border-gray-400 px-[6px] py-[6px] outline-none hover:border-orange'
            name='year'
            onChange={handleChange}
            value={value ? +value.getFullYear() : date.year}
          >
            {range(1990, new Date().getFullYear() + 1).map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>

        <div className='min-h-[14px] text-left text-xs font-light text-red-500'>{errors}</div>
      </div>
    </div>
  )
}
