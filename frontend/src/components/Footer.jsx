import React from 'react'
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div
      className='w-full mt-8 flex flex-col justify-center items-center opacity-90 py-6'
      style={{ backgroundColor: '#0e185f', minHeight: '64px' }}
    >
      <div className='container mx-auto text-white flex justify-center items-center'>
        <p>&copy; All rights reserved {new Date().getFullYear()}</p>
      </div>
      <div className='container mx-auto text-white text-center flex justify-center items-center'>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          tenetur!
        </p>
      </div>
      <div className='container mx-auto text-white flex justify-center items-center gap-2'>
        <a
          href='https://www.linkedin.com/in/muhammad-rifa-al-afghani-09a4441a2/'
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedin className='w-6 h-6' />
        </a>
        <a href='https://github.com/rifa712' target='_blank' rel='noreferrer'>
          <FaGithubSquare className='w-6 h-6' />
        </a>
      </div>
    </div>
  )
}

export default Footer
