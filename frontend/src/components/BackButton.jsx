import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

const BackButton = ({ url }) => {
  return (
    <Link
      to={url}
      className='flex justify-center items-center bg-black rounded-md text-white p-2 mt-2 ml-2 md:ml-0'
      style={{ width: 'max-content' }}
    >
      <FaArrowAltCircleLeft className='mr-2 w-6 h-6' /> Go Back
    </Link>
  )
}

export default BackButton
