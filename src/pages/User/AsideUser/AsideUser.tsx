import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Path } from 'src/contants/path'
import { AuthConext } from 'src/contexts/AppContextAuth'
import { createLinkAvt } from 'src/utils/util'

export default function AsideUser() {
  const { profile } = useContext(AuthConext)
  return (
    <div className='ml-0 md:ml-12'>
      <div className='flex items-center border-b-[1px] border-gray-200 pb-5'>
        <Link
          to={Path.profile}
          className='flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-gray-200'
        >
          {profile?.avatar ? (
            <img src={createLinkAvt(profile?.avatar)} alt='Avatar' className='h-full w-full object-cover' />
          ) : (
            <svg
              enableBackground='new 0 0 15 15'
              viewBox='0 0 15 15'
              x={0}
              y={0}
              className=' h-[34px] w-[34px] stroke-[#c6c6c6]'
            >
              <g>
                <circle cx='7.5' cy='4.5' fill='none' r='3.8' strokeMiterlimit={10} />
                <path d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6' fill='none' strokeLinecap='round' strokeMiterlimit={10} />
              </g>
            </svg>
          )}
        </Link>
        <div className='ml-3 flex-grow text-sm'>
          <div className='truncate font-semibold text-gray-800'>{profile?.email}</div>
          <Link to={Path.profile} className='mt-[2px] flex items-center'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>

            <span className='font-light capitalize text-gray-400'>Sửa hồ sơ</span>
          </Link>
        </div>
      </div>
      <div className='mt-6 text-sm font-light text-black'>
        <NavLink
          to={Path.profile}
          className={({ isActive }) =>
            classNames('flex items-center', { 'text-orange': isActive, 'text-black': !isActive })
          }
        >
          <div className='mr-2 h-5 w-5'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt='asideIcon'
              className='h-full w-full'
            />
          </div>
          <span className='mt-[2px] capitalize transition-colors hover:text-orange'>Tài Khoản của tôi</span>
        </NavLink>
        <NavLink
          to={Path.changePassword}
          className={({ isActive }) =>
            classNames('mt-3 flex items-center', { 'text-orange': isActive, 'text-black': !isActive })
          }
        >
          <div className='mr-2 h-5 w-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-full w-full stroke-blue-900 '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </div>
          <span className='mt-[2px] capitalize transition-colors hover:text-orange'>Đổi mật khẩu</span>
        </NavLink>
        <NavLink
          to={Path.historyPurchase}
          className={({ isActive }) =>
            classNames('mt-3 flex items-center', { 'text-orange': isActive, 'text-black': !isActive })
          }
        >
          <div className='mr-2 h-5 w-5'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt='asideIcon'
              className='h-full w-full'
            />
          </div>
          <span className='mt-[2px] capitalize transition-colors hover:text-orange'>Đơn Mua</span>
        </NavLink>
      </div>
    </div>
  )
}
