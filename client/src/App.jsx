import Post from './pages/Post'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import UserPosts from './pages/profile/userPosts'
import Subscriptions from './pages/profile/Subscriptions'
import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'
import { UpdateTheme, UseTheme } from './components/ThemeContext'
import colorPallete from './components/colorPallete'

const App = () => {
const theme=colorPallete()
  return (
    <main className="bg-gray-100  w-screen" id="main">

   
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/explore" element={<Explore theme={theme} />} />
       <Route path="/posts" element={<Post theme={theme} />} />
       <Route path="/profile" element={<Profile theme={theme} />} />
       <Route path="/edit-profile" element={<EditProfile theme={theme} />} />
       <Route path="/user-posts" element={<UserPosts />} />
       <Route path="/subscriptions" element={<Subscriptions />} />
       
      </Routes>

      
      
    </main>
  );
};

export default App;
