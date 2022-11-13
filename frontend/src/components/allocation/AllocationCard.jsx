import React, { useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
// components
import Button from '../Button'
// utils
import Modal from 'react-modal'
import { toast } from 'react-toastify'
// Redux
import {
  deleteAllocation,
  updateAllocation,
} from '../../features/allocation/allocationSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const AllocationCard = ({ allocation }) => {
  // Params
  const { allocationId } = useParams()

  // Modal
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const toggleEditModal = () => {
    setEditModalIsOpen((prev) => !prev)
    setCurrentId(allocation._id)
  }
  const toggleDeleteModal = () => {
    setDeleteModalIsOpen((prev) => !prev)
  }
  Modal.setAppElement('#root')

  // Form state
  const [allocationTitle, setAllocationTitle] = useState(
    allocation.allocationTitle
  )
  const [allocationAmount, setAllocationAmount] = useState(
    allocation.allocationAmount
  )
  const [allocationDescription, setAllocationDescription] = useState(
    allocation.allocationDescription
  )
  const [currentId, setCurrentId] = useState('')

  const updatedData = {
    allocationTitle,
    allocationAmount,
    allocationDescription,
  }

  const dispatch = useDispatch()

  const addItemSubmit = (e) => {
    e.preventDefault()
    dispatch(updateAllocation({ updatedData, currentId }))
    toast.success('Allocation edited successfully')
    toggleEditModal()
  }

  const onDeleteSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteAllocation(allocation._id))
    toast.success('Allocation deleted successfully')
    toggleDeleteModal()
  }

  return (
    <>
      <div className='w-11/12 md:w-6/12 lg:w-3/12 p-px'>
        <div className='flex flex-col justify-center items-center bg-white m-2 p-2 border-2 border-gray-200  rounded-lg drop-shadow-md'>
          <h1 className='text-md py-2 font-semibold'>
            {allocation.allocationTitle}
          </h1>
          <p className='w-full bg-gray-400 p-px'></p>
          <p className='mt-2'>Allocation Amount : </p>
          <p className='w-full text-teal-500 text-center font-semibold rounded-lg'>
            {allocation.allocationAmount}
          </p>
          {/* <p className='mt-2 font-semibold'>Description : </p>
        <p className='w-full  text-center'>
        {allocation.allocationDescription}
        </p> */}
          <Button
            url={`/allocation/${allocation._id}`}
            text='Detail & Expenses'
          />
          <div className='w-full py-2 flex justify-end gap-2'>
            <button
              onClick={() => toggleEditModal()}
              className='bg-blue-700 text-white px-4 py-2 flex justify-center rounded-md'
            >
              <FaEdit />
            </button>
            <button
              onClick={() => toggleDeleteModal()}
              className='bg-red-700 text-white px-4 py-2 flex justify-center rounded-md'
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
      {/* MODAL FORM */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={toggleEditModal}
        style={customStyles}
        contentLabel='Add note'
      >
        <button
          className='float-right font-bold bg-black rounded-full text-white w-6 h-6'
          onClick={toggleEditModal}
        >
          X
        </button>
        <h2 className='text-center text-xl'>Update Allocation Data</h2>
        <form onSubmit={addItemSubmit} className='p-6 flex flex-col'>
          <label htmlFor='allocationTitle' className={labelStyle}>
            Allocation Title
          </label>
          <input
            name='allocationTitle'
            id='allocationTitle'
            className={inputStyle}
            placeholder='Allocation Title'
            autoComplete='off'
            value={allocationTitle}
            onChange={(e) => setAllocationTitle(e.target.value)}
          />
          <label htmlFor='allocationAmount' className={labelStyle}>
            Amount
          </label>
          <input
            name='allocationAmount'
            id='allocationAmount'
            type='number'
            className={inputStyle}
            autoComplete='off'
            value={allocationAmount}
            onChange={(e) => setAllocationAmount(e.target.value)}
          />
          <label htmlFor='allocationDescription' className={labelStyle}>
            Description
          </label>
          <textarea
            name='allocationDescription'
            id='allocationDescription'
            className={inputStyle}
            autoComplete='off'
            value={allocationDescription}
            onChange={(e) => setAllocationDescription(e.target.value)}
          />
          <button
            className='block bg-gray-900 text-white mt-4 p-2 rounded-xl hover:scale-95 font-semibold'
            type='submit'
          >
            Save Changes
          </button>
        </form>
      </Modal>
      {/* END MODAL FORM */}
      {/* MODAL DELETE FORM */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={toggleDeleteModal}
        style={customStyles}
        contentLabel='Add note'
      >
        <button
          className='float-right font-bold bg-black rounded-full text-white w-6 h-6'
          onClick={toggleDeleteModal}
        >
          X
        </button>
        <h2 className='text-center text-xl'>
          Delete Allocation for {allocation.allocationTitle} ?
        </h2>
        <form onSubmit={onDeleteSubmit} className='p-6 flex flex-col'>
          <button
            className='block bg-red-700 text-white mt-4 p-2 rounded-xl hover:scale-95 font-semibold'
            type='submit'
          >
            Delete
          </button>
        </form>
      </Modal>
      {/* END MODAL DELETE FORM */}
    </>
  )
}

const labelStyle = 'font-semibold text-md md:text-xl mt-8'
const inputStyle = 'border-2 rounded-md border-black p-2 mt-2 outline-none'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    width: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    border: '3px solid black',
    background: '#fff',
  },
}

export default AllocationCard
