import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ url, text }) => {
  return (
    <Link
      to={url}
      className='flex justify-center items-center bg-black border-2 border-black rounded-md text-white mt-2 py-px w-full hover:scale-95'
    >
      {text}
    </Link>
  )
}

export default Button
