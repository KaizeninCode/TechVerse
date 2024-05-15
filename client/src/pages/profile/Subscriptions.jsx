import React from 'react'

import PostContainer from '../../components/PostContainer'
import ProfileNav from './ProfileNav'

function Subscriptions() {
  return (
    <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
      <ProfileNav/>
      
      <PostContainer/> 
    </div>
  )
}

export default Subscriptions
