import React from 'react'
import TopNav from './ProfileNav'
import PostContainer from '../../components/PostContainer'
import ProfileNav from './ProfileNav'

function UserPosts() {
  return (
    <div >
    <ProfileNav/>
    {/* <h1 className='text-center'>Post cards</h1> */}
    <PostContainer/>
    </div>
  )
}

export default UserPosts
