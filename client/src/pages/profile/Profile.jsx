import React from 'react'
import { Link } from 'react-router-dom'
const Profile = () => {
  return (
    <div>
     <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" className='rounded-full h-20 w-20'  alt='name' />
     <nav>
       <ul className='flex'>
       
         <li className='px-3'><Link>Edit Profile</Link></li>
         <li className='px-3'><Link>My Posts</Link></li>
         <li className='px-3'><Link>Subscriptions</Link></li>
       </ul>
     </nav>
    </div>
  )
}

export default Profile
