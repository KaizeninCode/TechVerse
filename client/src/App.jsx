import {Routes,Route } from 'react-router-dom'
import Post from './pages/Post'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import UserPosts from './pages/profile/userPosts'
import Subscriptions from './pages/profile/Subscriptions'
import UserAuth from './components/UserAuth'
import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'
import UserAuth from "./components/UserAuth"

const App = () => {

  return (
    <main>
      <Routes>
       <Route path='/' element={<Home/>}/> 
       <Route path='/explore' element={<Explore/>}/> 
       <UserAuth/>
      </Routes>
    </main>
    
  )
}

export default App
