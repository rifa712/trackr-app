import axios from 'axios'

const API_URL = '/api/allocations/'
const API_URL_EXPENSES = '/api/expenses/'

// GET Allocation expenses
const getExpenses = async (allocationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(API_URL + allocationId + '/expenses', config)

  return res.data
}

// Create Allocation expenses
const createExpenses = async (expensesData, allocationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.post(
    API_URL + allocationId + '/expenses',
    expensesData,
    config
  )

  return res.data
}

// DELETE Allocation expenses
const deleteExpenses = async (expensesId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.delete(API_URL_EXPENSES + expensesId, config)

  return res.data
}

const expensesService = {
  getExpenses,
  createExpenses,
  deleteExpenses,
}

export default expensesService
