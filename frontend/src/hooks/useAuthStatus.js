import { app } from '../config/firebase.config'
import { useEffect, useState } from 'react'
import { getAuth, onIdTokenChanged } from 'firebase/auth'
import { setUserInfo, setLogin } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth(app)

    onIdTokenChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        dispatch(setLogin())
        const updateUserInfo = (user) => {
          const userData = {
            userId: user.uid,
            email: user.email,
            displayName: user.displayName,
          }
          dispatch(setUserInfo(userData))
        }
        updateUserInfo(user)
      }
      setCheckingStatus(false)
    })
    // eslint-disable-next-line
  }, [])

  return { loggedIn, checkingStatus }
}

// if (user) {
//   await user.getIdToken().then((idToken) => {
//     if (!idToken) {
//       setLoggedIn(false)
//       setCheckingStatus(true)
//     } else {
//       dispatch(setLogin())
//       console.log('ganti')
//       setLoggedIn(true)
//       const updateUserInfo = (user) => {
//         const userData = {
//           userId: user.uid,
//           token: auth.currentUser.accessToken,
//           email: user.email,
//           displayName: user.displayName,
//         }
//         dispatch(setUserInfo(userData))
//       }
//       updateUserInfo(user)
//       setCheckingStatus(false)
//     }
//     console.log(new Date(user.stsTokenManager.expirationTime))
//   })
// }

// setCheckingStatus(false)
// const currentToken = await auth.currentUser?.getIdToken()

// if (user) {
//   dispatch(setLogin())
//   // await auth.currentUser?.getIdToken(true)
//   console.log(new Date(user.stsTokenManager.expirationTime))
//   // console.log(auth.currentUser)
//   setLoggedIn(true)
//   // updating userInfo in redux state
//   const updateUserInfo = (user) => {
//     const userData = {
//       userId: user.uid,
//       token: auth.currentUser.accessToken,
//       email: user.email,
//       displayName: user.displayName,
//     }
//     dispatch(setUserInfo(userData))
//   }
//   updateUserInfo(user)
// }
