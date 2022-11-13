import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
// redux
import { useDispatch } from 'react-redux'
import { deleteExpenses } from '../../features/expenses/expensesSlice'
// utils
import Modal from 'react-modal'
import { toast } from 'react-toastify'

const ExpensesCard = ({ expenses }) => {
  // Modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  const toggleDeleteModal = () => {
    setDeleteModalIsOpen((prev) => !prev)
  }
  Modal.setAppElement('#root')

  // Delete Submit
  const dispatch = useDispatch()
  const onDeleteSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteExpenses(expenses._id))
    setDeleteModalIsOpen((prev) => !prev)
  }

  return (
    <>
      <div className='w-full border-2 border-gray-300 rounded-xl p-2 flex justify-between shadow-md'>
        <div className='flex'>
          <div className='mr-2'>
            <h1>Name</h1>
            <p>Amount</p>
          </div>
          <div>
            <h1 className='ml-4'>: {expenses.expensesTitle}</h1>
            <p className='ml-4'>: {expenses.expensesAmount}</p>
          </div>
        </div>

        <div>
          <button
            onClick={toggleDeleteModal}
            className='bg-red-600 h-full w-full p-2 rounded-lg text-white'
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
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
          Delete Expenses for ? {expenses.expensesTitle}
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

export default ExpensesCard
