import React from 'react'
import { NavLink } from 'react-router-dom'
import Post from '../Post'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/AuthSlice'
import useAuth from '../../features/UseAuth'
function ProfileNav() {
  const user=useSelector(selectCurrentUser)
  const isAuthenticated = useAuth(['student','staff'])
  return (
    <div >
       <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" className='rounded-full h-20 w-20 m-4'  alt='name' />
       <h1 className='text-2xl px-4 font-bold'>{user}</h1>
      
       <nav className='m-4'>
  <ul className='flex'>
  {isAuthenticated&&
  <li className='px-6 py-3 rounded-md'>
      <NavLink to='/profile' className='active-link'>My Posts</NavLink>
    </li>
    
    }
    {isAuthenticated &&
    <li className='px-6 py-3 rounded-md'>
      <NavLink to='/subscriptions' className='px-6 py-3 rounded-md'>Subscriptions</NavLink>
    </li>
    }
     
   
    <li className='px-3'>
<EditProfile/>  
    </li>
    <li className='px-3'>
      
    </li>
  </ul>
</nav>
    </div>
  );
}

export default ProfileNav
