/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, text }) => {
  return (
    <div
      className='max-w-full bg-center bg-cover h-[26rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-800/70'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-neutral lg:text-4xl'>
            {text}
          </h1>
          <br />
          <Link
            to='/addservice' 
            className='w-full px-5 py-4 mt-4 text-sm font-medium text-neutral capitalize transition-colors duration-300 transform rounded-md lg:w-auto focus:outline-none '
          >
            <button className='btn btn-primary'>Give Reviews & Services</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide