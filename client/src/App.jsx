import Post from "./pages/Post";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import UserPosts from "./pages/profile/userPosts";
import Subscriptions from "./pages/profile/Subscriptions";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

import colorPallete from "./components/colorPallete";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import TopNav from "./components/TopNav";
import { UpdateTheme } from "./components/ThemeContext";
import Navbar from "./components/Navbar";
import RightNav from "./components/RightNav";

const App = () => {
  const toggleTheme=UpdateTheme()
  const theme=colorPallete()
  return (
    <main style={{background:theme.bg,color:theme.color}} className="w-screen " id="main">
    <TopNav toggleTheme={toggleTheme} theme={theme}/> 
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore theme={theme} />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/user-posts" element={<UserPosts />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
      
    </main>
  );
};

export default App;
