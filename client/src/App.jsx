
import Post from './pages/Post'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import UserPosts from './pages/profile/userPosts'
import Subscriptions from './pages/profile/Subscriptions'

import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'


const App = () => {

  return (
    <main className="bg-gray-100" id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
       <Route path='/' element={<Home/>}/> 
       <Route path='/explore' element={<Explore/>}/> 
       <UserAuth/>
      </Routes>
      <UserAuth />
    </main>
  );
}

export default App
