import React, { useEffect, useState } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllocation } from '../../features/allocation/allocationSlice'
import {
  getExpenses,
  createExpenses,
} from '../../features/expenses/expensesSlice'
// utils
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { FaPlusCircle } from 'react-icons/fa'
import ExpensesCard from '../../components/expenses/ExpensesCard'
import BackButton from '../../components/BackButton'
import { useParams } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'

const AllocationDetail = () => {
  // Redux
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const {
    expenses,
    expensesLoading,
    expensesCreateLoading,
    expensesDeleteLoading,
  } = useSelector((state) => state.expenses)
  const { allocation, allocationLoading } = useSelector(
    (state) => state.allocation
  )

  // Params
  const { allocationId } = useParams()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!expensesDeleteLoading && !expensesCreateLoading) {
      dispatch(getAllocation(allocationId))
      dispatch(getExpenses(allocationId))
    }
  }, [dispatch, allocationId, expensesCreateLoading, expensesDeleteLoading])

  useEffect(() => {
    if (!expensesLoading && !expensesDeleteLoading) {
      setTotal(
        expenses?.reduce((tot, ex) => {
          return tot + ex.expensesAmount || 0
        }, 0)
      )
    }
  }, [expensesLoading, expensesDeleteLoading])

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const toggleModal = () => {
    setModalIsOpen((prev) => !prev)
    setName('')
    setAmount(0)
  }
  Modal.setAppElement('#root')

  // Form
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const expensesData = {
    user: userInfo?.userId,
    expensesTitle: name,
    expensesAmount: amount,
  }

  const addItemSubmit = (e) => {
    // e.preventDefault()
    if (isNaN(amount)) toast.error('Amount must be a number')
    dispatch(createExpenses({ expensesData, allocationId }))
    toast.success('Expenses added successfully')
    // dispatch(getExpenses(allocationId))
    setName('')
    setAmount(0)
    toggleModal()
  }

  return (
    <>
      <div className='ml-4' style={{ width: '100%' }}>
        <BackButton url='/allocations' />
      </div>
      {/* <div className='w-12/12 mt-4'> */}
      <h1 className='text-center text-3xl py-4 font-semibold'>
        - Allocation Detail -
      </h1>
      {/* </div> */}
      {allocationLoading ? (
        <div className='w-full mx-auto flex justify-center mt-8'>
          <div className='flex-col justify-center items-center gap-4'>
            <CgSpinner className='animate-spin w-12 h-12 my-4' />
          </div>
        </div>
      ) : (
        <div className='w-12/12 flex flex-col md:flex-row items-center md:items-start justify-center mt-4'>
          {/* Allocation Detail */}
          <div className='w-11/12 md:w-6/12 border-2 border-gray-300 m-2 p-2 rounded-xl flex flex-col items-center justify-center shadow-lg'>
            <h1 className='font-semibold text-2xl'>
              {allocation?.allocationTitle}
            </h1>
            <p className='w-full bg-gray-400 p-px mt-2'></p>
            <div className='w-full flex justify-around items-center'>
              <div>
                <p className='mt-2 text-center'>Allocation Amount : </p>
                <p className='w-full text-teal-500 text-center text-2xl font-semibold rounded-lg'>
                  <span>{allocation?.allocationAmount}</span>
                </p>
              </div>
              <div>
                <p className='mt-2 text-center'>Total Expenses : </p>
                <p className='w-full text-red-500 text-center text-2xl font-semibold rounded-lg'>
                  <span>{expenses && !expensesLoading ? total : 0}</span>
                </p>
              </div>
            </div>
            <p className='w-full bg-gray-400 p-px mt-2'></p>
            <p className='font-bold'>Balance</p>
            {/* bg-green-500 border-green-300 py-2 px-8 text-2xl font-semibold text-white rounded-lg */}
            <p
              className={
                total &&
                !expensesLoading &&
                Number(allocation?.allocationAmount) - total < 0
                  ? 'bg-red-500 border-green-300 py-2 px-8 text-2xl font-semibold text-white rounded-lg'
                  : 'bg-green-500 border-green-300 py-2 px-8 text-2xl font-semibold text-white rounded-lg'
              }
            >
              <span>
                {total
                  ? Number(allocation?.allocationAmount) - total
                  : allocation?.allocationAmount}
              </span>
            </p>
            <p className='mt-2 text-justify'>
              <strong>Description</strong> :
            </p>
            <p>{allocation?.allocationDescription}</p>
            <button
              className='w-full mt-4 mb-2 bg-black text-white rounded-xl py-2 flex justify-center items-center text-lg hover:scale-95'
              onClick={() => toggleModal()}
            >
              <FaPlusCircle className='mr-2' /> Add Expenses Items
            </button>

            {/* MODAL FORM */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={toggleModal}
              style={customStyles}
              contentLabel='Add note'
            >
              <button
                className='float-right font-bold bg-black rounded-full text-white w-6 h-6'
                onClick={toggleModal}
              >
                X
              </button>
              <h2 className='text-center text-xl'>Add Expenses Item</h2>
              <form onSubmit={addItemSubmit} className='p-6 flex flex-col'>
                <label htmlFor='name' className={labelStyle}>
                  Name
                </label>
                <input
                  name='name'
                  id='name'
                  className={inputStyle}
                  placeholder='item...'
                  autoComplete='off'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='amount' className={labelStyle}>
                  Amount
                </label>
                <input
                  name='amount'
                  id='amount'
                  type='number'
                  className={inputStyle}
                  autoComplete='off'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className='block bg-gray-900 text-white mt-4 p-2 rounded-xl hover:scale-95 font-semibold'
                  type='submit'
                >
                  Add item
                </button>
              </form>
            </Modal>
            {/* END MODAL FORM */}
          </div>
          {/* END ALLOCATION DETAIL */}

          <div className='w-11/12 md:w-6/12  m-2 p-2 rounded-xl mb-12'>
            <h1 className='font-semibold text-2xl text-center'>
              Expenses item
            </h1>
            <p className='w-full bg-gray-400 p-px mt-2 mb-2'></p>
            <div className='flex flex-col gap-4'>
              {expenses === null || expenses.length === 0 ? (
                <p>No expenses yet ...</p>
              ) : (
                expenses?.map((exp) => (
                  <ExpensesCard key={exp._id} expenses={exp} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
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

export default AllocationDetail
