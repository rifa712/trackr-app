import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, getIdToken } from 'firebase/auth'
import { app } from '../../config/firebase.config'
import allocationService from './allocationService'

const initialState = {
  allocations: [],
  allocation: {},
  allocationLoading: true,
  createAllocationLoading: false,
  deletePending: false,
  updatePending: false,
}

const auth = getAuth(app)

// @desc    GET all allocation
export const getAllocations = createAsyncThunk(
  'allocations/get',
  async (_, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await allocationService.getAllocations(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// @desc GET single allocation
export const getAllocation = createAsyncThunk(
  'allocation/get',
  async (allocationId, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await allocationService.getAllocation(allocationId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// @desc Create new allocation
export const createAllocation = createAsyncThunk(
  'allocations/create',
  async (allocationData, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await allocationService.createAllocation(allocationData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// @desc UPDATE single allocation
export const updateAllocation = createAsyncThunk(
  'allocation/update',
  async ({ currentId, updatedData }, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await allocationService.updateAllocation(
        currentId,
        updatedData,
        token
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// @desc DELETE  allocation
export const deleteAllocation = createAsyncThunk(
  'allocation/delete',
  async (allocationId, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await allocationService.deleteAllocation(allocationId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const allocationSlice = createSlice({
  name: 'allocation',
  initialState,
  reducers: {
    resetAllocationData: (state) => {
      state.allocations = []
      state.allocation = {}
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL Allocations
      .addCase(getAllocations.pending, (state) => {
        state.allocationLoading = true
        state.allocation = null
        state.allocations = null
      })
      .addCase(getAllocations.fulfilled, (state, action) => {
        state.allocations = action.payload
        state.allocationLoading = false
      })
      // GET Allocation
      .addCase(getAllocation.pending, (state) => {
        state.allocationLoading = true
        state.allocation = null
      })
      .addCase(getAllocation.fulfilled, (state, action) => {
        state.allocation = action.payload
        state.allocationLoading = false
      })
      // CREATE Allocation
      .addCase(createAllocation.pending, (state) => {
        state.createAllocationLoading = true
      })
      .addCase(createAllocation.fulfilled, (state, action) => {
        state.createAllocationLoading = false
      })
      // UPDATE Allocation
      .addCase(updateAllocation.pending, (state) => {
        state.updatePending = true
      })
      .addCase(updateAllocation.fulfilled, (state) => {
        state.updatePending = false
      })
      // DELETE Allocation
      .addCase(deleteAllocation.pending, (state) => {
        state.deletePending = true
      })
      .addCase(deleteAllocation.fulfilled, (state) => {
        state.deletePending = false
      })
  },
})

export const { resetAllocationData } = allocationSlice.actions

export default allocationSlice.reducer
