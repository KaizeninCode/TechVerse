import React from 'react'
import { logout } from '../features/AuthSlice'
import { useDispatch } from 'react-redux'
import { LiaDoorOpenSolid } from 'react-icons/lia';
import { useToast } from '@chakra-ui/react';
import RequireAuth from '../features/RequireAuth';
function LogOut() {
    const dispatch=useDispatch()
    const toast = useToast();
  const handleLogout=()=>{
    setTimeout(()=> {
      
     
        dispatch(logout())
        window.location.href = '/signin';  
       
      },3000)
     showToast('You have been logged out')
  }
  const showToast = (message) => {
   
    toast({
      title: message,
      status:'success',
      duration: 5000,
      isClosable: true,
      position: "top",
    });
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
