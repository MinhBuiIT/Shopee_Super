import AsideUser from '../../AsideUser'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div className='border-b-[3px] border-orange bg-gray-light pb-12 pt-6'>
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
