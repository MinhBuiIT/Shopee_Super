import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}
type PropsController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & Props
const InputV2 = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: PropsController<TFieldValues, TName>
) => {
  const { className, onChange, value, type, ...rest } = props
  const { field } = useController(props)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value || ''
    const numberCondition = type === 'number' && (/^\d+$/.test(valueInput) || valueInput === '')
    if (numberCondition || type !== 'number') {
      // Nếu truyền onChange ở ngoài thì mình sẽ change
      onChange && onChange(e)
      // Change theo react-hook-form
      field.onChange(e)
    }
  }
  return (
    <input
      {...rest}
      {...field}
      onChange={handleChange}
      ref={field.ref}
      value={value && onChange ? Number(value) : field.value}
      className={
        className ||
        'w-[40%] rounded-sm border border-solid border-gray-300 px-1 py-1 text-sm text-gray-500 outline-none'
      }
    />
  )
}
export default InputV2

// type Benz<TFunc> = {
//   getName: TFunc
// }
// const Render = <T extends () => string, P extends ReturnType<T>>(props: { name: Benz<T>; otherName: P }) => {
//   return null
// }
// const handleFunc: () => 'minh' = () => {
//   return 'minh'
// }
// const App = () => {
//   return <Render name={{ getName: handleFunc }} otherName='minh' />
// }
