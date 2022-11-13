import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { createAllocation } from '../../features/allocation/allocationSlice'
import { useNavigate } from 'react-router-dom'

const CreateAllocation = () => {
  const { loggedInStatus, userInfo } = useSelector((state) => state.auth)
  const { createAllocationLoading } = useSelector((state) => state.allocation)

  const navigate = useNavigate()
  useEffect(() => {
    if (!loggedInStatus) {
      navigate('/sign-in')
    }
    // eslint-disable-next-line
  }, [loggedInStatus])

  const [allocationTitle, setAllocationTitle] = useState('')
  const [allocationDescription, setAllocationDescription] = useState('')
  const [allocationAmount, setAllocationAmount] = useState(0)

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createAllocation({
        user: userInfo.userId,
        allocationTitle,
        allocationDescription,
        allocationAmount,
      })
    )
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/allocations')
        toast.success('New allocation created!')
      })
      .catch(toast.error)
  }

  if (createAllocationLoading) return <Spinner text='Saving data ...' />

  return (
    <>
      <div className='mx-auto' style={{ width: '85%' }}>
        <BackButton url='/' />
      </div>

      <div className='w-full  flex flex-col items-center justify-center mt-4'>
        <h1 className='text-xl md:text-3xl font-semibold'>
          Create a new allocation
        </h1>
        <form
          onSubmit={onSubmit}
          className='mt-4 shadow-2xl rounded-xl p-6 flex flex-col'
          style={{ width: '85%' }}
        >
          <label htmlFor='allocationTitle' className={labelStyle}>
            Title
          </label>
          <input
            className={inputStyle}
            type='text'
            id='allocationTitle'
            onChange={(e) => setAllocationTitle(e.target.value)}
            placeholder='Input your title'
            value={allocationTitle}
          />
          <label htmlFor='allocationDescription' className={labelStyle}>
            Description
          </label>
          <textarea
            className={inputStyle}
            type='text'
            id='allocationDescription'
            onChange={(e) => setAllocationDescription(e.target.value)}
            placeholder='Input your description'
            value={allocationDescription}
          />
          <label htmlFor='allocationAmount' className={labelStyle}>
            Amount
          </label>
          <input
            className={inputStyle}
            type='number'
            id='allocationAmount'
            onChange={(e) => setAllocationAmount(e.target.value)}
            placeholder='Input your amount'
            value={allocationAmount}
          />

          <button
            type='submit'
            className={`${labelStyle} + bg-black text-white rounded-lg p-2`}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

const labelStyle = 'font-semibold text-md md:text-xl mt-8'
const inputStyle = 'border-2 rounded-md border-black p-2 mt-2 outline-none'

export default CreateAllocation
