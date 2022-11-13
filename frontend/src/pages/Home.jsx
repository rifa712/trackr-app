import React from 'react'
import { FaMoneyCheckAlt, FaClipboardList } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// assets

const Home = () => {
  return (
    <div className='mt-4'>
      <div className='w-full h-full flex flex-col justify-center items-center mt-16'>
        <h1 className='font-semibold text-center text-3xl py-2 md:text-5xl md:leading-relaxed text-black'>
          Track Your Money or Expenses
        </h1>
        <p className='font-bold text-center text-2xl md:text-4xl md:leading-normal text-gray-500 mt-4 mb-12'>
          Please choose from an options below
        </p>
        <Link
          to='/create-new-allocation'
          className='rounded-md border-2 border-black text-xl p-2 flex items-center justify-center mb-4'
          style={{ width: '80%' }}
        >
          <FaMoneyCheckAlt className='mr-2' /> Make a new allocation
        </Link>
        <Link
          to='/allocations'
          className='rounded-md border-2 bg-black text-white text-xl p-2 flex items-center justify-center'
          style={{ width: '80%' }}
        >
          <FaClipboardList className='mr-2' /> View your allocation
        </Link>
      </div>
    </div>
  )
}

export default Home
