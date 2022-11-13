import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
  loggedInStatus: false,
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state) => {
      state.loading = true
      state.loggedInStatus = true
      state.loading = false
    },
    setLogout: (state) => {
      state.loading = true
      state.loggedInStatus = false
      state.userInfo = null
      state.loading = false
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { setLogin, setLogout, setUserInfo } = authSlice.actions

export default authSlice.reducer
