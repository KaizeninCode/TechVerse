import React from 'react'
import { logout } from '../features/AuthSlice'
import { useDispatch } from 'react-redux'
import { LiaDoorOpenSolid } from 'react-icons/lia';
function LogOut() {
    const dispatch=useDispatch()
  const handleLogout=()=>{
    setTimeout(()=> {
      
     
        dispatch(logout())
        window.location.href = '/signin';
      },3000)
  }
  return (
    <div className='flex items-center justify-between w-[150px]'>
      <button onClick={handleLogout} className='text-lg font-montserrat font-bold my-3 flex items-center justify-start' type="button">
      <LiaDoorOpenSolid fontSize={'1.5rem'}/>
      Logout
      </button>
    </div>
  )
}

export default LogOut
