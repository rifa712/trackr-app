import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// redux
import Spinner from '../Spinner'
// hooks
import { useAuthStatus } from '../../hooks/useAuthStatus'
import { useSelector } from 'react-redux'

const PrivateRoutes = ({ children }) => {
  // const dispatch = useDispatch()
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner text='Loading...' />
  }

  //   Outlet used so the routes can load the child
  return loggedIn && !checkingStatus ? children : <Navigate to='/sign-in' />
}

export default PrivateRoutes
