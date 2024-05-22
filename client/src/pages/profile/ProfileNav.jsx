import React from 'react'
import { NavLink } from 'react-router-dom'
import Post from '../Post'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/AuthSlice'
import useAuth from '../../features/UseAuth'
import MenuBar from '../../components/MenuBar'
import { MdNotificationsActive } from "react-icons/md";
import { UpdateTheme } from '../../components/ThemeContext'
import colorPallete from '../../components/colorPallete'

function ProfileNav() {
  const user=useSelector(selectCurrentUser)
  const isAuthenticated = useAuth(['student','staff'])
  const toggleTheme=UpdateTheme()
  const theme=colorPallete()
  return (
    <div >
    <div className='flex justify-between'>
    <div>
       <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" className='rounded-full h-20 w-20 m-4'  alt='name' />
       <h1 className='text-2xl px-4 font-bold'>{user}</h1>
    </div>
      
      <div className='flex'>
      <MenuBar toggleTheme={toggleTheme} theme={theme}/>
     <div className='flex p-1 ml-2'>
      <MdNotificationsActive fontSize={'2rem'} top={'1rem'} position={'relative'} /> 
      
     
    </div>
      </div>
    </div>
      
       <nav className='m-4'>
  <ul className='flex'>
  
  <li className='px-6 py-3 rounded-md'>
      <NavLink to='/profile' className='active-link'>My Posts</NavLink>
    </li>
    
   
    {isAuthenticated &&
    <li className='px-6 py-3 rounded-md'>
      <NavLink to='/subscriptions' className='px-6 py-3 rounded-md'>Subscriptions</NavLink>
    </li>
    }
     
    <li className='px-6 py-3 rounded-md'>
      <NavLink to='/bookmarks' className='px-6 py-3 rounded-md'>My Wish list</NavLink>
    </li>
    <li className='px-3'>
<EditProfile/>  
    </li>
   
  </ul>
</nav>
    </div>
  );
}

export default ProfileNav
