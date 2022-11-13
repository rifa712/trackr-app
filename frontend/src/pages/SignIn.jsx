import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import googleIcon from '../assets/svg/googleIcon.svg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { app } from '../config/firebase.config'
// redux
import { useDispatch } from 'react-redux'
import { setLogin } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loadingSignIn, setLoadingSignIn] = useState(false)
  // formData State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth(app)

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredential.user) {
        onLoadingSignIn()
        setTimeout(() => {
          dispatch(setLogin())
          navigate('/')
          onLoadingSignIn()
          toast.success('Logged in successfully')
        }, [1000])
      }
    } catch (error) {
      toast.error('Bad User Credentials')
    }
  }

  const onLoadingSignIn = () => {
    setLoadingSignIn((prev) => !prev)
  }
  if (loadingSignIn) return <Spinner text='Signing In' />

  return (
    <div className='w-full mt-4'>
      <h1 className='text-xl text-center md:text-3xl font-semibold mb-2'>
        Sign In
      </h1>

      <div className='flex flex-col sm:flex-row flex-wrap w-12/12 justify-between'>
        {/* LEFT */}
        <div className='w-12/12 sm:w-7/12 mt-2 shadow-2xl rounded-xl p-6 flex flex-col'>
          <form onSubmit={onSubmit} className='w-full p-6 flex flex-col'>
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

            <button
              type='submit'
              className='font-semibold text-md md:text-xl mt-8 bg-blue-700 text-white rounded-lg p-2'
            >
              Sign In
            </button>
          </form>
          <Link to='/sign-up' className='text-right pr-6'>
            Sign up instead ?
          </Link>
        </div>
        {/* END LEFT */}

        {/* RIGHT */}
        {/* <div className='w-12/12 sm:w-5/12 mt-4  p-4'>
          <div className='w-full min-h-max flex flex-col items-center justify-center '>
            <h1 className='text-xl text-center md:text-xl mb-2'>
              Sign In with
            </h1>
            <button className={labelStyle}>
              <img className='w-20 h-20' src={googleIcon} alt='google' />
            </button>
          </div>
        </div> */}
        {/* END RIGHT */}
      </div>
    </div>
  )
}

const labelStyle = 'font-semibold text-md md:text-xl mt-2 ml-2'
const inputStyle = 'w-full rounded-xl bg-gray-200 p-2 mt-2 outline-none'

export default SignIn
