import axios from 'axios'

const API_URL = '/api/allocations/'

// GET all Allocations
const getAllocations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(API_URL, config)

  return res.data
}

// GET single Allocations
const getAllocation = async (allocationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(API_URL + allocationId, config)

  return res.data
}

// Create new allocation
const createAllocation = async (allocationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.post(API_URL, allocationData, config)

  return res.data
}

// UPDATE Allocation
const updateAllocation = async (currentId, updatedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.put(API_URL + currentId, updatedData, config)

  return res.data
}

// DELETE Allocation
const deleteAllocation = async (allocationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.delete(API_URL + allocationId, config)

  return res.data
}

const allocationService = {
  getAllocations,
  getAllocation,
  createAllocation,
  updateAllocation,
  deleteAllocation,
}

export default allocationService
