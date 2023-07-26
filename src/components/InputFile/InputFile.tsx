import { useRef } from 'react'
import { toast } from 'react-toastify'
interface Props {
  onChange?: (value: File) => void
  textBtn: string
}
export default function InputFile({ onChange, textBtn }: Props) {
  const refInputFile = useRef<HTMLInputElement>(null)
  const handleChooseAvt = () => {
    if (refInputFile.current) refInputFile.current.click()
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file && (file.size >= Math.pow(1024, 2) || !file.type.includes('image'))) {
        toast.error('Định dạng file không phù hợp', {
          autoClose: 2000
        })
      } else if (file) {
        onChange && onChange(file)
      }
    }
  }
  return (
    <>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        ref={refInputFile}
        onChange={handleChange}
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(e.target as any).value = null
        }}
      />
      <button
        className='ml-1 mt-3 rounded-sm border-[2px] border-gray-300 bg-white px-3 py-2 text-center text-sm font-light text-gray-700 outline-none transition-all hover:bg-neutral-100'
        type='button'
        onClick={handleChooseAvt}
      >
        {textBtn}
      </button>
    </>
  )
}
