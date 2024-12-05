import React from 'react'
import "../App.css"
import {useNavigate} from "react-router-dom"
const Start = () => {

  const navigate = useNavigate();
  return (
    <div>
      <div className='bg-image flex flex-col justify-between'>
        <img src='/assets/logo.png' className='logo'></img>
        <div className='bg-white h-[18%] w-full'>
          <h1 className='text-3xl text-center font-extrabold mt-7 '>Get Started with Uber</h1>
          <button className='bg-black text-white flex items-center text-2xl p-5 entry-btn rounded left-[50%] right-[50%] justify-center w-[80%] h-[50px]' onClick={() => navigate("/userLogin")}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Start