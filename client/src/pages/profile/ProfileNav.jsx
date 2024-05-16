import React from 'react'
import { NavLink } from 'react-router-dom'
import Post from '../Post'
import EditProfile from './EditProfile'
function ProfileNav() {
  const username=localStorage.getItem('username')
  return (
    <div >
       <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" className='rounded-full h-20 w-20 m-4'  alt='name' />
       <h1 className='text-2xl px-4 font-bold'>{username}</h1>
      
       <nav className='m-4'>
  <ul className='flex'>
    <li className='px-6 py-3 rounded-md'>
      <NavLink to='/profile' className='active-link'>My Posts</NavLink>
    </li>
    <li className='px-6 py-3 rounded-md'>
      <NavLink to='/subscriptions' className='px-6 py-3 rounded-md'>Subscriptions</NavLink>
    </li>
    <li className='px-3'>
<EditProfile/>  
    </li>
    <li className='px-3'>
      
    </li>
  </ul>
</nav>
    </div>
  )
}

export default ProfileNav
