import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import Post from '../Post'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/AuthSlice'
import useAuth from '../../features/UseAuth'
import MenuBar from '../../components/MenuBar'
import { MdNotificationsActive } from "react-icons/md";
import { UpdateTheme } from '../../components/ThemeContext'
import colorPallete from '../../components/colorPallete'
import Notifications from './Notifications'
function ProfileNav() {
  const user=useSelector(selectCurrentUser)
  const isAuthenticated = useAuth(['student','staff'])
  const toggleTheme=UpdateTheme()
  const theme=colorPallete()
  return (
    <div className='border-b border-gray-400 mb-3'>
    <div className='flex justify-between'>
    <div>
       <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" className='rounded-full h-20 w-20 m-4'  alt='name' />
       <h1 className='text-2xl px-4 font-bold'>{user}</h1>
    </div>
      
      <div className='flex'>
      <MenuBar toggleTheme={toggleTheme} theme={theme}/>
     <div className='flex p-1 ml-2'>
     <Notifications/>

      
     
    </div>
      </div>
    </div>
      
       <nav className='m-4'>
       <ul className='flex'>
      <li className='px-6 py-3 rounded-md'>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive ? 'underline px-6 py-3 font-bold rounded-md' : 'px-6 py-3 rounded-md'
          }
        >
          My Posts
        </NavLink>
      </li>

      {isAuthenticated && (
        <li className='px-6 py-3 rounded-md'>
          <NavLink
            to='/subscriptions'
            className={({ isActive }) =>
              isActive ? 'underline font-bold px-6 py-3 rounded-md' : 'px-6 py-3 rounded-md'
            }
          >
            Subscriptions
          </NavLink>
        </li>
      )}

      <li className='px-6 py-3 rounded-md'>
        <NavLink
          to='/bookmarks'
          className={({ isActive }) =>
            isActive ? 'underline px-6 py-3 font-bold rounded-md' : 'px-6 py-3 rounded-md'
          }
        >
          My Wish list
        </NavLink>
      </li>
      <EditProfile/>
    </ul>
</nav>
    </div>
  );
}

export default ProfileNav
