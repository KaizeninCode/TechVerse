import Post from "./pages/Post";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import UserPosts from "./pages/profile/userPosts";
import Subscriptions from "./pages/profile/Subscriptions";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { UpdateTheme, UseTheme } from "./components/ThemeContext";
import colorPallete from "./components/colorPallete";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";


const App = () => {
  return (
    <main className="bg-gray-100   w-screen" id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
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
