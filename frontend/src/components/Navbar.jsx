import React, { useEffect, useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
// firebase
import { app } from '../config/firebase.config'
import { getAuth, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import Modal from 'react-modal'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setLogout } from '../features/auth/authSlice'
import { resetAllocationData } from '../features/allocation/allocationSlice'
// hooks
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const Navbar = () => {
  const [loadingLogout, setLoadingLogout] = useState(false)
  const { loggedIn, checkingStatus } = useAuthStatus()
  const navigate = useNavigate()

  // redux
  const dispatch = useDispatch()
  const { loggedInStatus } = useSelector((state) => state.auth)

  const auth = getAuth(app)

  // Loggin out
  const onLogout = () => {
    toggleModal()
    onLoadingLogout()

    setTimeout(() => {
      auth.signOut()
      dispatch(setLogout())
      dispatch(resetAllocationData())
      onLoadingLogout()
      navigate('/')
    }, [1000])
  }

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const toggleModal = () => {
    setModalIsOpen((prev) => !prev)
  }
  Modal.setAppElement('#root')

  const onLoadingLogout = () => {
    setLoadingLogout((prev) => !prev)
  }

  if (loadingLogout) return <Spinner text='Logging Out' />

  return (
    <nav
      className='w-full mx-auto bg-white shadow-lg py-2 flex items-center sticky top-0'
      style={{ minHeight: '64px' }}
    >
      <div className='container mx-auto flex items-center justify-between px-2 md:px-0'>
        <div>
          <Link to='/' className={navItemStyle}>
            {/* <img className='w-14 h-14' src={Logo} alt='' /> */}
            <h1
              className='ml-2 font-bold text-2xl border-2 border-black'
              style={{ color: '#0e185f', borderColor: '#0e185f' }}
            >
              <span
                className='pl-2 pr-px'
                style={{ color: '#0e185f', paddingRight: '2px' }}
              >
                T R A
              </span>
              <span
                className='text-white pr-2 pl-px'
                style={{ backgroundColor: '#0e185f', paddingLeft: '2px' }}
              >
                C K R
              </span>
            </h1>
          </Link>
        </div>
        {checkingStatus ? (
          <></>
        ) : (
          <div>
            <ul className='flex items-center justify-between gap-4'>
              {loggedInStatus ? (
                <>
                  {/* <li>
                    <Link to='/profile' className={navItemStyle}>
                      <FaUser className='mr-2' />
                      Profile
                    </Link>
                  </li> */}
                  <li>
                    <button className={navItemStyle} onClick={toggleModal}>
                      <FaSignOutAlt className='mr-2' /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/sign-in' className={navItemStyle}>
                      <FaSignInAlt className='mr-2' /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to='/sign-up' className={navItemStyle}>
                      <FaUser className='mr-2' /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* MODAL FORM */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          style={customStyles}
          contentLabel='Add note'
        >
          <h2 className='text-center text-xl'>Are you sure want to logout ?</h2>
          <div className='p-6 flex flex-row gap-4'>
            <button
              className='w-full block bg-red-600 text-white mt-4 p-2 rounded-xl hover:scale-95 font-semibold'
              type='submit'
              onClick={onLogout}
            >
              Yes
            </button>
            <button
              className='w-full block bg-green-600 text-white mt-4 p-2 rounded-xl hover:scale-95 font-semibold'
              type='submit'
              onClick={toggleModal}
            >
              No
            </button>
          </div>
        </Modal>
        {/* END MODAL FORM */}
      </div>
    </nav>
  )
}

const navItemStyle = 'flex justify-center items-center'
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    width: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    border: '3px solid black',
    background: '#fff',
  },
}

export default Navbar
