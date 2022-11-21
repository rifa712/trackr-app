import React from 'react'

const Spinner = ({ text }) => {
  return (
    <div className='loadingSpinnerContainer flex flex-col gap-4'>
      <div className='loadingSpinner'></div>
      <h1 className='text-2xl text-white font-semibold'>{text}</h1>
    </div>
  )
}

export default Spinner
