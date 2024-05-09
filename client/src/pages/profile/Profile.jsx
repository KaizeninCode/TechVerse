import React from 'react'
import { Link } from 'react-router-dom'
import TopNav from './topNav'
import EditProfile from './EditProfile'
import UserPosts from './userPosts'
import Subscriptions from './Subscriptions'
const Profile = () => {
  return (
    <div className='justify-center align-middle flex  shadow-md'>
    
    <UserPosts/>
   
    </div>
  )
}

export default Profile
