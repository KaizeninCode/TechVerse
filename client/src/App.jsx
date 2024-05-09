import {Routes,Route } from 'react-router-dom'
import Post from './pages/Post'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import UserPosts from './pages/profile/userPosts'
import Subscriptions from './pages/profile/Subscriptions'
import UserAuth from './components/UserAuth'
const App = () => {

  return (
    <>
      <Post/>
      <UserAuth/>
      <Routes>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/edit' element={<EditProfile/>} />
        <Route path='/myposts' element={<UserPosts/>} />
        <Route path='/subscriptions' element={<Subscriptions/>} />
      </Routes>
    </>
  )
}

export default App
