export default function Footer() {
  return (
    <div className='bg-gray-100 px-8 pb-8 pt-12 xl:px-0'>
      <div className='container'>
        <div className='grid grid-cols-1 text-sm lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <p className='text-gray-600'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</p>
          </div>
          <div className='mt-2 grid grid-cols-12 text-gray-600 lg:col-span-8 lg:col-start-5 lg:mt-0'>
            <div className='col-span-2 mr-1'>Quốc gia & Khu vực:</div>
            <ul className='col-span-10 grid grid-cols-4 text-center md:grid-cols-8 lg:flex lg:flex-wrap'>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Indonesia</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Chile</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Đài Loan</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Thái Lan</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Malaysia</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Việt Nam</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Philippines</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Brazil</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>México</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Colombia</span>
              </li>
              <li className='col-span-1 lg:w-fit lg:flex-shrink-0 lg:px-1'>
                <span>Singapore</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-10 text-gray-600'>
          <p className='mt text-center text-xs'>Công ty TNHH Shopee</p>
          <div className='mt-5 text-center text-xs'>
            <p>
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
              phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            </p>
            <p className='mt-2'>
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
            </p>
            <p className='mt-2'>
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
            </p>
            <p className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
          </div>
        </div>
      </div>
    </div>
  )
}
