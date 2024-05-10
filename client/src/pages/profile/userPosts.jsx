import React from 'react'
import TopNav from './topNav'
import PostContainer from '../../components/PostContainer'

function UserPosts() {
  return (
    <div >
    <TopNav/>
    {/* <h1 className='text-center'>Post cards</h1> */}
    <PostContainer/>
    </div>
  )
}

export default UserPosts
