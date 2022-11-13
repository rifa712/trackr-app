import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import expensesService from './expensesService'
import { getAuth, getIdToken } from 'firebase/auth'
import { app } from '../../config/firebase.config'

const initialState = {
  expenses: [],
  expensesLoading: false,
  expensesCreateLoading: false,
  expensesDeleteLoading: false,
}

const auth = getAuth(app)

// @desc    GET expenses
export const getExpenses = createAsyncThunk(
  'expenses/get',
  async (allocationId, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await expensesService.getExpenses(allocationId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// @desc    Create expenses
export const createExpenses = createAsyncThunk(
  'expenses/create',
  async ({ expensesData, allocationId }, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await expensesService.createExpenses(
        expensesData,
        allocationId,
        token
      )
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

// @desc    DELETE expenses
export const deleteExpenses = createAsyncThunk(
  'expenses/delete',
  async (expensesId, thunkAPI) => {
    try {
      const token = await auth.currentUser.getIdToken(true)
      return await expensesService.deleteExpenses(expensesId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    resetExpensesData: (state) => {
      state.expenses = []
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getExpenses.pending, (state) => {
        state.expenses = []
        state.expensesLoading = true
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload
        state.expensesLoading = false
      })
      // CREATE
      .addCase(createExpenses.pending, (state) => {
        state.expensesCreateLoading = true
      })
      .addCase(createExpenses.fulfilled, (state, action) => {
        state.expensesCreateLoading = false
      })
      // DELETE
      .addCase(deleteExpenses.pending, (state) => {
        state.expensesDeleteLoading = true
      })
      .addCase(deleteExpenses.fulfilled, (state) => {
        state.expensesDeleteLoading = false
      })
  },
})

export const { resetExpensesData } = expensesSlice.actions

export default expensesSlice.reducer
