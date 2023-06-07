import { arrow, flip, useFloating, shift, offset, FloatingPortal, FloatingArrow, Placement } from '@floating-ui/react'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  classNameEle?: string
  duration?: number
  element: React.ReactNode
  placementMode?: Placement
  initialOpen?: boolean
  isArrow?: boolean
  isScale?: boolean
}
export default function Popover({
  element,
  children,
  classNameEle,
  duration,
  placementMode,
  initialOpen,
  isArrow,
  isScale
}: Props) {
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement: `${placementMode || 'top-end'}`,
    middleware: [arrow({ element: arrowRef }), flip(), shift(), offset(6)]
  })
  const [openModal, setOpenModel] = useState(initialOpen || false)
  const isOpenModal = () => {
    setOpenModel(true)
  }
  const isLeaveModal = () => {
    setOpenModel(false)
  }
  return (
    <div onMouseEnter={isOpenModal} onMouseLeave={isLeaveModal} className='relative'>
      <div className='absolute bottom-[-15px] right-0 z-20 h-5 w-full bg-transparent'></div>
      <div
        className={classNameEle || 'flex cursor-pointer items-center gap-1 hover:opacity-80'}
        ref={refs.setReference}
      >
        {element}
      </div>

      <AnimatePresence>
        {openModal && (
          <FloatingPortal>
            <div ref={refs.setFloating} style={floatingStyles} className='relative'>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transformOrigin: `${(middlewareData.arrow?.x || 0) + 10}px ${middlewareData.arrow?.y || 0}px`
                }}
                exit={{
                  opacity: 0,
                  scale: isScale ? 0 : 1,
                  transformOrigin: `${(middlewareData.arrow?.x || 0) + 10}px ${middlewareData.arrow?.y || 0}px`
                }}
                transition={{ duration: `${duration || 0.2}` }}
              >
                {isArrow && <FloatingArrow ref={arrowRef} context={context} fill='#fff' />}

                {children}
              </motion.div>
            </div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </div>
  )
}
