import React from 'react'

import PostContainer from '../../components/PostContainer'
import ProfileNav from './ProfileNav'
import UserPosts from './userPosts'
import Navbar from '../../components/Navbar'
import RightNav from '../../components/RightNav'

function Subscriptions() {
  return (
    <section className='section'>

    <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
  <Navbar/>
  <UserPosts/>
 <RightNav/>
  </div>
  </section>
  )
}

export default Subscriptions
