
import Post from './pages/Post'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import UserPosts from './pages/profile/userPosts'
import Subscriptions from './pages/profile/Subscriptions'
import UserAuth from './components/UserAuth'
import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import RightNav from './components/RightNav'


const App = () => {

  return (
    <main className="bg-gray-100 justify-center flex w-screen" id="main">
    <Navbar/>
    <div className='container flex justify-center align-middle items-center w-full'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
       <Route path="/posts" element={<Post />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/edit-profile" element={<EditProfile />} />
       <Route path="/user-posts" element={<UserPosts />} />
       <Route path="/subscriptions" element={<Subscriptions />} />
       
      </Routes>
    </div>
      
      <RightNav/>
    </main>
  );
}

export default App
