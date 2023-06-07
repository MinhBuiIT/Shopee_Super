import React from 'react'
import Footer from 'src/components/Footer'
import HeaderRegister from 'src/components/HeaderRegister'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <HeaderRegister />
      {children}
      <Footer />
    </div>
  )
}
