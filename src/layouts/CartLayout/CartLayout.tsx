import Footer from 'src/components/Footer'
import HeaderCart from 'src/components/HeaderCart'

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderCart />
      {children}
      <Footer />
    </>
  )
}
