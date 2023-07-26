import { Outlet } from 'react-router-dom'
import SEO from 'src/SEO'
import img from 'src/assets'
import AsideUser from '../../AsideUser'

export default function UserLayout() {
  return (
    <div className='border-b-[3px] border-orange bg-gray-light pb-12 pt-6'>
      <SEO title='Tài Khoản Cá Nhân' description='Shopee Việt Nam' name='Minh Bui' type='summary' img={img.Shopee} />
      <div className='container '>
        <div className='grid grid-cols-1 md:grid-cols-12'>
          <div className=' md:col-span-2'>
            <AsideUser />
          </div>
          <div className='md:col-span-10 md:ml-16'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
