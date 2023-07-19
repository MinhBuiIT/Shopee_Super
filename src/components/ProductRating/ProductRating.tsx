export default function ProductRating({
  rating,
  classNameStar = 'h-3 w-3 fill-yellow-400',
  classNameStarHidden = 'h-3 w-3 fill-current text-gray-bold'
}: {
  rating: number
  classNameStar?: string
  classNameStarHidden?: string
}) {
  const ratingFull = Math.floor(rating)
  const handleWidthStar = (index: number) => {
    let widthStar = 0
    if (index + 1 <= ratingFull) {
      widthStar = 100
    } else if (Math.ceil(rating) === index + 1) {
      widthStar = (rating - Math.floor(rating)) * 100
    } else {
      widthStar = 0
    }
    return widthStar
  }
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='relative inline-block' key={index}>
              <div
                className={`absolute left-0 top-0 w-0 overflow-hidden`}
                style={{ width: handleWidthStar(index) + '%' }}
              >
                <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={classNameStar}>
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={classNameStarHidden}>
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          )
        })}
    </>
  )
}
