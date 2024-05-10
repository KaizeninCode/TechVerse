
import Post from './pages/Post'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import UserPosts from './pages/profile/userPosts'
import Subscriptions from './pages/profile/Subscriptions'

import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'
import UserAuth from "./components/UserAuth"
import Navbar from './components/Navbar'

const App = () => {

  return (
    <main className='flex'>

    {/* <UserAuth/> */}
    <Navbar/>
      <Routes>
       <Route path='/' element={<Home/>}/> 
       <Route path='/explore' element={<Explore/>}/> 
       <Route path='/profile' element={<Profile/>}/>
      <Route path='/edit' element={<EditProfile/>}/>
      <Route path='/myposts' element={<UserPosts/>}/>
      <Route path='/subscriptions' element={<Subscriptions/>}/>
      
      </Routes>
    </main>
    
  )
}

export default App
