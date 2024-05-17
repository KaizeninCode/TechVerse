import React from "react";
import { Link } from "react-router-dom";
import TopNav from "./ProfileNav";
import EditProfile from "./EditProfile";
import UserPosts from "./userPosts";
import Subscriptions from "./Subscriptions";
import Navbar from "../../components/Navbar";
import RightNav from "../../components/RightNav";
const Profile = () => {
  return (
    <section className="section">
      <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
        <Navbar />
        <UserPosts />
        <RightNav />
      </div>
    </section>
  );
};

export default Profile;
