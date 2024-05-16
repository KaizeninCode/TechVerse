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
import Layout from "./Layout";
import RequireAuth from "./features/RequireAuth";

const App = () => {
  const toggleTheme=UpdateTheme()
  const theme=colorPallete()
  return (
    <main style={{background:theme.bg,color:theme.color}} className="w-screen " id="main">
    <TopNav toggleTheme={toggleTheme} theme={theme}/> 
    
      <Routes>
      <Route path="/" element={<Layout />}>
       {/*public routes  */}
      <Route path="/" element={<Home theme={theme} />} />
      <Route path="/signup" element={<SignUp theme={theme} />} />
      <Route path="/signin" element={<SignIn theme={theme} />} />
      {/* protected routes */}
       <Route element={<RequireAuth/>}>
       <Route path="/explore" element={<Explore theme={theme} />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/user-posts" element={<UserPosts theme={theme} />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
       </Route>
        
      </Route>
        
      </Routes>
      
    </main>
  );
};

export default App;
