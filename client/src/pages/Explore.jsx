import Header from "../components/Header"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import RightNav from "../components/RightNav"
import SearchBar from "../components/SearchBar"


const Explore = () => {
  return (
    <section className='section'>
      <div className="w-full h-screen flex justify-between">
          
          <Header/>
          <PostContainer/>
         
        </div>
    </section>
  )
}

export default Explore
