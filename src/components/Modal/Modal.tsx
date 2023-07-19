import { createPortal } from 'react-dom'

interface Props {
  iconElement: React.ReactNode
  isSuccess: boolean
  text: string
}
export default function Modal({ iconElement, isSuccess, text }: Props) {
  return (
    <>
      {createPortal(
        <div className='fixed left-1/2 top-1/2 z-50 mx-auto flex h-[260px] w-[45vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded bg-black/50 px-1 md:w-[35vw] lg:w-[25vw]'>
          <div
            className={`flex h-[50px] w-[50px] items-center justify-center rounded-full ${
              isSuccess ? 'bg-green-400' : 'bg-red-400'
            }`}
          >
            {iconElement}
          </div>
          <p className='mt-4 text-center text-base font-normal text-white'>{text}</p>
        </div>,
        document.body
      )}
    </>
  )
}
