import React, { useEffect, useState } from 'react'
// utils
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaArrowAltCircleUp } from 'react-icons/fa'
// RRD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Private Route
import PrivateRoutes from './components/route/PrivateRoutes'
// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import CreateAllocation from './pages/allocation/CreateAllocation'
import AllocationList from './pages/allocation/AllocationList'
import AllocationDetail from './pages/allocation/AllocationDetail'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

const App = () => {
  const [isVisible, setIsVisible] = useState(true)

  const listenToScroll = () => {
    let heightToHideFrom = 50
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    if (winScroll > heightToHideFrom) {
      isVisible && // to limit setting state only the first time
        setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [])
  return (
    <>
      <Router>
        <div className='w-full'>
          <Navbar />
          <div className='container mx-auto' style={{ minHeight: '80vh' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/sign-in' element={<SignIn />} />

              {/* PRIVATE ROUTES */}

              {/* ALLOCATIONS */}
              <Route
                path='/create-new-allocation'
                element={
                  <PrivateRoutes>
                    <CreateAllocation />
                  </PrivateRoutes>
                }
              />

              <Route
                path='/allocations'
                element={
                  <PrivateRoutes>
                    <AllocationList />
                  </PrivateRoutes>
                }
              />

              <Route
                path='/allocation/:allocationId'
                element={
                  <PrivateRoutes>
                    <AllocationDetail />
                  </PrivateRoutes>
                }
              />

              {/* END ALLOCATIONS */}

              {/* EXPENSES */}
              {/* END EXPENSES */}

              {/* END PRIVATE ROUTES */}

              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
      {!isVisible && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
          className='fixed bottom-4 right-4 bg-teal-500 p-4 rounded-full flex justify-center items-center'
        >
          <FaArrowAltCircleUp className='text-white' />
        </button>
      )}
    </>
  )
}

export default App
