import React, { useEffect, useState } from 'react'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { getAllocations } from '../../features/allocation/allocationSlice'
// components
import AllocationCard from '../../components/allocation/AllocationCard'
import BackButton from '../../components/BackButton'
import { CgSpinner } from 'react-icons/cg'

const AllocationList = () => {
  // redux
  const { allocations, allocationLoading, deletePending, updatePending } =
    useSelector((state) => state.allocation)
  // const { userInfo } = useSelector((state) => state.auth)
  const [searchText, setSearchText] = useState('')
  const [allocationFiltered, setAllocationFiltered] = useState([])

  const dispatch = useDispatch()
  useEffect(() => {
    if (!deletePending && !updatePending) dispatch(getAllocations())
  }, [dispatch, deletePending, updatePending])

  // Search
  const onChange = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
    setAllocationFiltered(
      allocations.filter((allocation) =>
        allocation.allocationTitle
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    )
  }

  return (
    <>
      <div className='ml-4' style={{ width: '100%' }}>
        <BackButton url='/' />
      </div>
      <div className='w-full flex flex-col items-center justify-center mt-4'>
        <h1 className='text-xl md:text-3xl py-4 font-semibold mb-2'>
          Your allocation collections
        </h1>
        <input
          className={inputStyle}
          style={{ width: '85%' }}
          type='text'
          id='searchText'
          autoComplete='off'
          onChange={onChange}
          placeholder='serach your allocation...'
        />

        {allocationLoading ? (
          <div className='w-full mx-auto flex justify-center mt-8'>
            <div className='flex flex-col justify-center items-center gap-4'>
              <CgSpinner className='animate-spin w-12 h-12 my-4' />
            </div>
          </div>
        ) : (
          <div className='container w-12/12 mt-8 flex flex-wrap justify-center md:justify-start items-center'>
            {searchText !== ''
              ? allocationFiltered?.map((allocation) => (
                  <AllocationCard
                    key={allocation._id}
                    allocation={allocation}
                  />
                ))
              : allocations?.map((allocation) => (
                  <AllocationCard
                    key={allocation._id}
                    allocation={allocation}
                  />
                ))}
          </div>
        )}
      </div>
    </>
  )
}

const inputStyle = 'border-2 rounded-md border-black p-2 mt-2 outline-none'

export default AllocationList
