import {useState} from 'react'
import TopNav from './ProfileNav'
import PostContainer from '../../components/PostContainer'
import ProfileNav from './ProfileNav'

function UserPosts({theme}) {
  const [userPost, setUserPosts]= useState([])
  return (
    <div className='lg:w-[60%] overflow-y-scroll gap-4 mx-5 my-3' id="posts" >
    <ProfileNav/>
    {/* <h1 className='text-center'>Post cards</h1> */}
    <PostContainer/>
    </div>
  )
}

export default UserPosts
