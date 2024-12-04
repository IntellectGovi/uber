import React from 'react'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import UserRegister from './pages/UserRegister'
import CaptainRegister from './pages/CaptainRegister'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        <Route path='/captainLogin' element={<CaptainLogin/>}/>
        <Route path='/userSignup' element={<UserRegister/>}/>
        <Route path='/captainSignup' element={<CaptainRegister/>}/>
      </Routes>
    </div>
  )
}

export default App