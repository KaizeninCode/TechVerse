import { Routes, Route } from "react-router-dom";
import Post from "./pages/Post";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import UserPosts from "./pages/profile/userPosts";
import Subscriptions from "./pages/profile/Subscriptions";
import UserAuth from "./components/UserAuth";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
;

const App = () => {
  return (
    <main className="bg-gray-100" id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/userPosts" element={<UserPosts />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/post" element={<Post />} />
    
      </Routes>
      <UserAuth />
    </main>
  );
};

export default App;
