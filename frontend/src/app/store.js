import { configureStore } from '@reduxjs/toolkit'
import allocationReducer from '../features/allocation/allocationSlice'
import expensesReducer from '../features/expenses/expensesSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    allocation: allocationReducer,
    expenses: expensesReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
