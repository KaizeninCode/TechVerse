
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
import { UpdateTheme, UseTheme } from './components/ThemeContext'
// import colorPallete, {ThemeStyles} from './components/colorPallete'
import TopNav from './components/TopNav'
import colorPallete from './components/colorPallete'

const App = () => {
const theme=colorPallete()
const toggleTheme=UpdateTheme()

  return (
    <main style={{background:theme.bg, color:theme.color}}  className="bg-gray-100  w-screen" id="main">
    <TopNav toggleTheme={toggleTheme} theme={theme}/>
   
    <div className='container p-4 flex justify-center w-screen'>
    <Navbar  theme={theme}/>
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/explore" element={<Explore theme={theme} />} />
       <Route path="/posts" element={<Post theme={theme} />} />
       <Route path="/profile" element={<Profile theme={theme} />} />
       <Route path="/edit-profile" element={<EditProfile theme={theme} />} />
       <Route path="/user-posts" element={<UserPosts />} />
       <Route path="/subscriptions" element={<Subscriptions />} />
       
      </Routes>

      <RightNav theme={theme}/>
    </div>
      
      
    </main>
  );
}

export default App
