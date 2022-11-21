import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import googleIcon from '../assets/svg/googleIcon.svg'
// toast
import { toast } from 'react-toastify'
// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { app } from '../config/firebase.config'
import { Link, useNavigate } from 'react-router-dom'
// import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
// redux
import { useDispatch } from 'react-redux'
import { setLogin } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [loadingSignUp, setLoadingSignUp] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const dispatch = useDispatch()
  // Submit
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth(app)

      // const userCredential =
      await createUserWithEmailAndPassword(auth, email, password)

      // const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // const formDataCopy = {
      //   ...formData,
      // }
      // delete formDataCopy.password
      // formDataCopy.timestamp = serverTimestamp()

      // await setDoc(doc(db, 'users', user.uid), formDataCopy)
      onLoadingSignUp()
      setTimeout(() => {
        dispatch(setLogin())
        navigate('/')
        onLoadingSignUp()
        toast.success('Sign Up Succesfuly')
      }, [1000])

      // navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registrarion')
    }
  }

  const onLoadingSignUp = () => {
    setLoadingSignUp((prev) => !prev)
  }
  if (loadingSignUp) return <Spinner text='Signing Up' />

  return (
    <>
      <div className='w-full mt-4'>
        <h1 className='text-xl text-center md:text-3xl font-semibold mb-2 py-2'>
          Sign Up a New User
        </h1>

        <div className='flex flex-col sm:flex-row flex-wrap w-12/12 justify-between'>
          {/* LEFT */}
          <div className='w-12/12 sm:w-7/12 mt-2 shadow-2xl p-6 rounded-xl flex flex-col'>
            <form onSubmit={onSubmit} className='w-full flex flex-col'>
              <label htmlFor='name' className={labelStyle}>
                Name
              </label>
              <input
                className={inputStyle}
                type='text'
                id='name'
                onChange={onChange}
                placeholder='Input your name'
                value={name}
              />
              <label htmlFor='email' className={labelStyle}>
                Email
              </label>
              <input
                className={inputStyle}
                type='text'
                id='email'
                onChange={onChange}
                placeholder='Input your email'
                value={email}
              />
              <label htmlFor='password' className={labelStyle}>
                Password
              </label>
              <div className='w-full flex flex-row items-center'>
                <input
                  className={inputStyle}
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  onChange={onChange}
                  placeholder='Input your password'
                  value={password}
                />
                <div
                  className='ml-2 cursor-pointer flex items-center'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FaEye className='w-6 h-6' />
                  ) : (
                    <FaEyeSlash className='w-6 h-6' />
                  )}
                </div>
              </div>

              <label htmlFor='password2' className={labelStyle}>
                Confirm Password
              </label>

              <div className='w-full flex flex-row items-center'>
                <input
                  className={inputStyle}
                  type={showPassword2 ? 'text' : 'password'}
                  id='password2'
                  onChange={onChange}
                  placeholder='Confirm your password'
                  value={password2}
                />
                <div
                  className='ml-2 cursor-pointer flex items-center'
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? (
                    <FaEye className='w-6 h-6' />
                  ) : (
                    <FaEyeSlash className='w-6 h-6' />
                  )}
                </div>
              </div>

              <button
                type='submit'
                className='font-semibold text-md md:text-xl mt-8 bg-blue-700 text-white rounded-lg p-2'
              >
                Sign Up
              </button>
            </form>
            <Link to='/sign-in' className='text-right pt-6 pr-6'>
              Already have an account ?
            </Link>
          </div>
          {/* END LEFT */}

          {/* RIGHT */}
          {/* <div className='w-12/12 sm:w-5/12 mt-4  p-4'>
            <div className='w-full min-h-max flex flex-col items-center justify-center '>
              <h1 className='text-xl text-center md:text-xl mb-2'>
                Sign Up with
              </h1>
              <button className={labelStyle}>
                <img className='w-20 h-20' src={googleIcon} alt='google' />
              </button>
            </div>
          </div> */}
          {/* END RIGHT */}
        </div>
      </div>
    </>
  )
}

const labelStyle = 'font-semibold text-md md:text-xl mt-2 ml-2'
const inputStyle = 'w-full rounded-xl bg-gray-200 p-2 mt-2 outline-none'

export default SignUp
